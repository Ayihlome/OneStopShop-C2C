const pool = require('../db/pool');
const config = require('../config');
const logger = require('../utils/logger');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

function buildPaymentRedirectUrl(template, bookingId, paymentId, result) {
  const fallbackPath = result === 'success' ? '/payment/success' : '/payment/cancel';
  const rawUrl = template || `http://localhost:5173${fallbackPath}`;
  const url = rawUrl
    .replace(':bookingId', encodeURIComponent(String(bookingId)))
    .replace(':paymentId', encodeURIComponent(String(paymentId)));
  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}bookingId=${encodeURIComponent(String(bookingId))}&paymentId=${encodeURIComponent(String(paymentId))}&result=${result}`;
}

function paymentStatusFromPayFast(status) {
  switch (String(status || '').toUpperCase()) {
    case 'COMPLETE':
      return 'successful';
    case 'CANCELLED':
    case 'CANCELED':
      return 'cancelled';
    case 'FAILED':
      return 'failed';
    default:
      return 'failed';
  }
}

async function notifyPaymentOutcome(client, payment, status) {
  const bookingResult = await client.query(
    `SELECT
       b.id,
       b.customer_user_id,
       sp.account_id AS provider_account_id
     FROM bookings b
     INNER JOIN service_provider_profiles sp ON sp.id = b.service_provider_id
     WHERE b.id = $1`,
    [payment.booking_id]
  );
  const booking = bookingResult.rows[0];

  if (!booking) {
    return;
  }

  const providerMessage = status === 'successful'
    ? `Payment received for booking #${booking.id}`
    : `Payment ${status} for booking #${booking.id}`;
  const customerMessage = status === 'successful'
    ? `Your payment for booking #${booking.id} was successful`
    : `Your payment for booking #${booking.id} was ${status}`;

  await client.query(
    `INSERT INTO notifications (recipient_id, recipient_type, message)
     VALUES ($1, 'mechanic', $2), ($3, 'user', $4)`,
    [
      booking.provider_account_id,
      providerMessage,
      booking.customer_user_id,
      customerMessage,
    ]
  );
}

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
      return_url: buildPaymentRedirectUrl(config.payfast.returnUrl, bookingId, payment.id, 'success'),
      cancel_url: buildPaymentRedirectUrl(config.payfast.cancelUrl, bookingId, payment.id, 'cancel'),
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

async function updatePaymentFromPayFast(mPaymentId, payfastPaymentId, payfastStatus) {
  const nextStatus = paymentStatusFromPayFast(payfastStatus);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const paymentResult = await client.query(
      `UPDATE payments
       SET payment_status = $2,
           payfast_payment_id = $3,
           paid_at = CASE WHEN $2 = 'successful' THEN NOW() ELSE paid_at END
       WHERE id = $1
         AND payment_status = 'pending'
       RETURNING *`,
      [mPaymentId, nextStatus, payfastPaymentId]
    );

    const payment = paymentResult.rows[0];
    if (!payment) {
      throw createError(404, 'Payment not found or already processed');
    }

    if (nextStatus === 'successful') {
      await client.query(
        `UPDATE bookings
         SET booking_status = 'paid'
         WHERE id = $1`,
        [payment.booking_id]
      );
    }

    await notifyPaymentOutcome(client, payment, nextStatus);

    await client.query('COMMIT');

    logger.info('PayFast payment update processed', {
      paymentId: payment.id,
      bookingId: payment.booking_id,
      payfastPaymentId,
      status: nextStatus,
    });

    return sanitize(payment);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Payment update rolled back', { mPaymentId, payfastStatus });
    throw error;
  } finally {
    client.release();
  }
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

async function getPaymentStatus(bookingId, requester) {
  const result = await pool.query(
    `SELECT 
        p.*,
        sp.business_whatsapp_number,
        sp.account_id AS provider_account_id,
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

  const isOwner = Number(row.customer_user_id) === Number(requester.id);
  const isProvider = Number(row.provider_account_id) === Number(requester.id);
  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isOwner && !isProvider && !isAdmin) {
    throw createError(403, 'Forbidden');
  }

  const paymentConfirmed = row.payment_status === 'successful';

  const response = sanitize(row);
  delete response.business_whatsapp_number; // remove by default
  delete response.provider_account_id;

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

async function cancelPendingPayment(bookingId, requester) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const paymentResult = await client.query(
      `UPDATE payments p
       SET payment_status = 'cancelled'
       FROM bookings b
       WHERE p.booking_id = b.id
         AND p.booking_id = $1
         AND b.customer_user_id = $2
         AND p.payment_status = 'pending'
       RETURNING p.*`,
      [bookingId, requester.id]
    );

    const payment = paymentResult.rows[0];
    if (payment) {
      await notifyPaymentOutcome(client, payment, 'cancelled');
    }

    await client.query('COMMIT');

    return getPaymentStatus(bookingId, requester);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}


module.exports = {
  initiateSandboxPayment,
  updatePaymentFromPayFast,
  getPaymentStatus,
  cancelPendingPayment,
  listAllPayments,
};
