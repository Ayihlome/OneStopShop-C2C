const pool = require('../db/pool');
const config = require('../config');
const logger = require('../utils/logger');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

// Build a PayFast redirect URL from a provider-priced booking.
// The provider's PayFast merchant credentials are read from their profile.
async function initiateSandboxPayment(bookingId, payerUserId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Load booking with provider PayFast details
    const bookingResult = await client.query(
      `SELECT
         b.*,
         sp.payfast_merchant_id,
         sp.payfast_merchant_key
       FROM bookings b
       INNER JOIN service_provider_profiles sp ON sp.id = b.service_provider_id
       WHERE b.id = $1
         AND b.customer_user_id = $2
         AND b.booking_status = 'payment_pending'`,
      [bookingId, payerUserId]
    );

    const booking = bookingResult.rows[0];

    if (!booking) {
      throw createError(404, 'Booking not found or payment already processed');
    }

    const merchantId = String(booking.payfast_merchant_id || '').trim();
    const merchantKey = String(booking.payfast_merchant_key || '').trim();

    if (!merchantId || !merchantKey) {
      throw createError(400, 'This provider has not configured PayFast merchant credentials');
    }

    const quoteAmount = Number(booking.quoted_amount);
    if (!Number.isFinite(quoteAmount) || quoteAmount <= 0) {
      throw createError(400, 'The provider must set a booking price before payment can be made');
    }

    const amount = quoteAmount.toFixed(2);

    // Insert a pending payment record
    const paymentResult = await client.query(
      `INSERT INTO payments (booking_id, payer_user_id, amount, currency, payment_status)
       VALUES ($1, $2, $3, 'ZAR', 'pending')
       ON CONFLICT (booking_id) DO UPDATE
       SET payer_user_id = EXCLUDED.payer_user_id,
           amount = EXCLUDED.amount,
           currency = EXCLUDED.currency,
           payment_status = 'pending',
           payfast_payment_id = NULL,
           sandbox_transaction_id = NULL,
           paid_at = NULL
       WHERE payments.payment_status IN ('pending', 'failed', 'cancelled')
       RETURNING *`,
      [bookingId, payerUserId, amount]
    );

    const payment = paymentResult.rows[0];
    if (!payment) {
      throw createError(409, 'Payment has already been completed for this booking');
    }

    await client.query('COMMIT');

    const payfastBaseUrl = config.payfast.sandbox
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process';

    // Build PayFast redirect URL
    const params = new URLSearchParams({
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: config.payfast.returnUrl,
      cancel_url: config.payfast.cancelUrl,
      notify_url: config.payfast.notifyUrl,
      m_payment_id: String(payment.id),
      amount,
      item_name: `OneStopShop Booking #${bookingId}`,
    });

    const redirectUrl = `${payfastBaseUrl}?${params.toString()}`;

    logger.info('PayFast payment initiated', {
      bookingId,
      paymentId: payment.id,
      payerUserId,
      amount,
      sandbox: config.payfast.sandbox,
    });

    return {
      paymentId: payment.id,
      amount,
      currency: payment.currency,
      redirectUrl,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Payment initiation rolled back', { bookingId, payerUserId });
    throw error;
  } finally {
    client.release();
  }
}

// Called by the PayFast ITN webhook after a successful payment.
// Marks the payment as successful and advances the booking to 'paid'.
// The WhatsApp URL is now unlocked for the customer.
async function confirmPayment(mPaymentId, payfastPaymentId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const paymentResult = await client.query(
      `UPDATE payments
       SET payment_status = 'successful',
           payfast_payment_id = $2,
           paid_at = NOW()
       WHERE id = $1
         AND payment_status = 'pending'
       RETURNING *`,
      [mPaymentId, payfastPaymentId]
    );

    const payment = paymentResult.rows[0];
    if (!payment) {
      throw createError(404, 'Payment not found or already processed');
    }

    await client.query(
      `UPDATE bookings
       SET booking_status = 'paid'
       WHERE id = $1`,
      [payment.booking_id]
    );

    await client.query('COMMIT');

    logger.info('Payment confirmed and booking advanced to paid', {
      paymentId: payment.id,
      bookingId: payment.booking_id,
      payfastPaymentId,
    });

    return sanitize(payment);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Payment confirmation rolled back', { mPaymentId });
    throw error;
  } finally {
    client.release();
  }
}

// Returns the payment row for a booking and, if confirmed,
// the provider's WhatsApp URL for the customer.
async function getPaymentStatus(bookingId, requesterId) {
  const result = await pool.query(
    `SELECT
       p.*,
       sp.business_whatsapp_number,
       b.customer_user_id,
       b.booking_status
     FROM payments p
     INNER JOIN bookings b ON b.id = p.booking_id
     INNER JOIN service_provider_profiles sp ON sp.id = b.service_provider_id
     WHERE p.booking_id = $1`,
    [bookingId]
  );

  const row = result.rows[0];
  if (!row) {
    throw createError(404, 'Payment not found for this booking');
  }

  // Only the customer who made the booking can see the WhatsApp URL
  const isOwner = Number(row.customer_user_id) === Number(requesterId);
  const paymentConfirmed = row.payment_status === 'successful';

  const response = sanitize(row);
  delete response.business_whatsapp_number; // remove by default

  if (isOwner && paymentConfirmed && row.business_whatsapp_number) {
    const cleaned = String(row.business_whatsapp_number).replace(/\D/g, '');
    response.whatsapp_url = `https://wa.me/${cleaned}`;

    // Advance booking status to 'whatsapp_redirected' if still on 'paid'
    if (row.booking_status === 'paid') {
      await pool.query(
        `UPDATE bookings SET booking_status = 'whatsapp_redirected' WHERE id = $1`,
        [bookingId]
      );
    }
  }

  return response;
}

async function listAllPayments() {
  const result = await pool.query(
    `SELECT
       p.*,
       b.description AS booking_description,
       b.booking_status,
       a.email AS payer_email,
       a.first_name AS payer_first_name,
       a.last_name AS payer_last_name
     FROM payments p
     INNER JOIN bookings b ON b.id = p.booking_id
     INNER JOIN accounts a ON a.id = p.payer_user_id
     ORDER BY p.created_at DESC`
  );
  return sanitize(result.rows);
}

async function getPaymentStatus(bookingId, requesterId) {
  const result = await pool.query(
    `SELECT 
        p.*,
        sp.business_whatsapp_number,
        b.customer_user_id,
        b.booking_status
      FROM payments p
      INNER JOIN bookings b ON b.id = p.booking_id
      INNER JOIN service_provider_profiles sp ON sp.id = b.service_provider_id
      WHERE p.booking_id = $1`,
    [bookingId]
  );

  const row = result.rows[0];
  if (!row) {
    throw createError(404, 'Payment not found for this booking');
  }

  // Only the customer who made the booking can see the WhatsApp URL
  const isOwner = Number(row.customer_user_id) === Number(requesterId);
  const paymentConfirmed = row.payment_status === 'successful';

  const response = sanitize(row);
  delete response.business_whatsapp_number; // remove by default

  if (isOwner && paymentConfirmed && row.business_whatsapp_number) {
    const cleaned = String(row.business_whatsapp_number).replace(/\D/g, '');
    response.whatsapp_url = `https://wa.me/${cleaned}`;

    // Advance booking status to 'whatsapp_redirected' if still on 'paid'
    if (row.booking_status === 'paid') {
      await pool.query(
        `UPDATE bookings SET booking_status = 'whatsapp_redirected' WHERE id = $1`,
        [bookingId]
      );
    }
  }

  return response;
}

async function paymentSuccess(bookingId, requesterId) {
  // For simplicity, reuse getPaymentStatus logic to return payment details
  return getPaymentStatus(bookingId, requesterId);
}


module.exports = {
  initiateSandboxPayment,
  confirmPayment,
  getPaymentStatus,
  paymentSuccess,
  listAllPayments,
};
