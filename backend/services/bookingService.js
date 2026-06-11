const pool = require('../db/pool');
const logger = require('../utils/logger');
const { errorMeta } = require('../utils/logging');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');
const whatsapp = require('./whatsappService');

const BOOKING_SELECT = `
  SELECT
    b.*,
    ua.first_name AS customer_first_name,
    ua.last_name AS customer_last_name,
    pa.first_name AS provider_first_name,
    pa.last_name AS provider_last_name,
    sp.business_name,
    sp.id AS provider_profile_id,
    v.make AS vehicle_make,
    v.model AS vehicle_model,
    v.license_plate
  FROM bookings b
  INNER JOIN accounts ua ON ua.id = b.customer_user_id
  INNER JOIN service_provider_profiles sp ON sp.id = b.service_provider_id
  INNER JOIN accounts pa ON pa.id = sp.account_id
  INNER JOIN vehicles v ON v.id = b.vehicle_id
`;

async function ensureVehicleBelongsToUser(vehicleId, userId) {
  const result = await pool.query(
    `SELECT id
     FROM vehicles
     WHERE id = $1
       AND user_id = $2`,
    [vehicleId, userId]
  );

  if (!result.rows[0]) {
    logger.warn('Booking validation failed because vehicle is not owned by user', {
      userId,
      vehicleId,
    });
    throw createError(400, 'Vehicle does not belong to this user');
  }
}

async function resolveProviderProfileId(providerId) {
  const result = await pool.query(
    `SELECT id FROM service_provider_profiles WHERE id = $1 AND provider_status = 'active'`,
    [providerId]
  );

  if (result.rows[0]) {
    return result.rows[0].id;
  }

  const byAccount = await pool.query(
    `SELECT id FROM service_provider_profiles WHERE account_id = $1 AND provider_status = 'active'`,
    [providerId]
  );

  if (!byAccount.rows[0]) {
    logger.warn('Booking validation failed because provider was not found', {
      providerId,
    });
    throw createError(400, 'Service provider not found or unavailable');
  }

  return byAccount.rows[0].id;
}

async function createBooking(userId, input) {
  await ensureVehicleBelongsToUser(input.vehicleId, userId);
  const providerProfileId = await resolveProviderProfileId(input.providerId);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const booking = await client.query(
      `INSERT INTO bookings (
         customer_user_id, service_provider_id, vehicle_id, description, preferred_schedule
       )
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userId,
        providerProfileId,
        input.vehicleId,
        input.description,
        input.preferredSchedule,
      ]
    );

    // Notify the provider's account
    await client.query(
      `INSERT INTO notifications (recipient_id, recipient_type, message)
      VALUES (
         (SELECT account_id FROM service_provider_profiles WHERE id = $1),
         'mechanic',
         $2
       )`,
      [
        providerProfileId,
        `New booking request #${booking.rows[0].id}`,
      ]
    );

    await client.query('COMMIT');

    // ── WhatsApp notifications (non-blocking) ──────────────
    const newBooking = booking.rows[0];
    sendBookingNotifications(
      { ...input, providerId: providerProfileId },
      newBooking,
      userId
    ).catch((err) =>
      logger.error('WhatsApp notification failed', errorMeta(err))
    );

    logger.info('Booking created', {
      bookingId: booking.rows[0].id,
      userId,
      providerId: providerProfileId,
      vehicleId: input.vehicleId,
      status: booking.rows[0].booking_status,
    });

    return sanitize(booking.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Booking creation rolled back', {
      ...errorMeta(error, { includeStack: true }),
      userId,
      providerId: providerProfileId,
      vehicleId: input.vehicleId,
    });
    throw error;
  } finally {
    client.release();
  }
}

async function getBooking(id, requester) {
  const result = await pool.query(
    `${BOOKING_SELECT}
     WHERE b.id = $1`,
    [id]
  );
  const booking = result.rows[0];

  if (!booking) {
    logger.warn('Booking lookup failed because booking was not found', {
      bookingId: id,
      requesterId: requester.id,
      role: requester.role,
    });
    throw createError(404, 'Booking not found');
  }

  const isOwner = Number(booking.customer_user_id) === Number(requester.id);

  // Check if the requester is the provider linked to this booking
  const providerResult = await pool.query(
    `SELECT id FROM service_provider_profiles WHERE id = $1 AND account_id = $2`,
    [booking.service_provider_id, requester.id]
  );
  const isProvider = providerResult.rows.length > 0;

  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isOwner && !isProvider && !isAdmin) {
    logger.warn('Booking access forbidden', {
      bookingId: id,
      requesterId: requester.id,
      role: requester.role,
    });
    throw createError(403, 'Forbidden');
  }

  // Include WhatsApp contact info for customer
  if (isOwner) {
    // Always include provider's WhatsApp number as a contact channel
    const providerInfo = await pool.query(
      `SELECT sp.business_whatsapp_number
       FROM service_provider_profiles sp
       WHERE sp.id = $1`,
      [booking.service_provider_id]
    );

    if (providerInfo.rows[0]?.business_whatsapp_number) {
      const cleaned = String(providerInfo.rows[0].business_whatsapp_number).replace(/\D/g, '');
      const message = encodeURIComponent(
        `I've booked you via OneStopShop (Booking #${booking.id})`
      );
      booking.contact_whatsapp_url = `https://wa.me/${cleaned}?text=${message}`;
    }

    // Payment-confirmed whatsapp_url (existing flow — full access)
    const paymentInfo = await pool.query(
      `SELECT p.payment_status
       FROM bookings b2
       INNER JOIN payments p ON p.booking_id = b2.id
       WHERE b2.id = $1`,
      [id]
    );

    if (paymentInfo.rows[0] && paymentInfo.rows[0].payment_status === 'successful') {
      const cleaned = String(providerInfo.rows[0]?.business_whatsapp_number || '').replace(/\D/g, '');
      if (cleaned) {
        booking.whatsapp_url = `https://wa.me/${cleaned}`;
      }
    }
  }

  return sanitize(booking);
}

async function listUserBookings(userId) {
  const result = await pool.query(
    `${BOOKING_SELECT}
     WHERE b.customer_user_id = $1
     ORDER BY b.created_at DESC`,
    [userId]
  );

  return sanitize(result.rows);
}

async function listMechanicBookings(mechanicId) {
  const result = await pool.query(
    `${BOOKING_SELECT}
     WHERE b.service_provider_id = (
       SELECT id FROM service_provider_profiles WHERE account_id = $1
     )
     ORDER BY b.created_at DESC`,
    [mechanicId]
  );

  return sanitize(result.rows);
}

async function updateBookingStatus(id, status, requester) {
  const current = await pool.query(
    `SELECT *
     FROM bookings
     WHERE id = $1`,
    [id]
  );
  const booking = current.rows[0];

  if (!booking) {
    logger.warn('Booking status update failed because booking was not found', {
      bookingId: id,
      requestedStatus: status,
      requesterId: requester.id,
      role: requester.role,
    });
    throw createError(404, 'Booking not found');
  }

  // Guards: paid and whatsapp_redirected are set by the payment system only
  if (status === 'paid' || status === 'whatsapp_redirected') {
    throw createError(400, 'This status is set automatically by the payment system');
  }

  // Check if the requester is the provider for this booking
  const providerResult = await pool.query(
    `SELECT id FROM service_provider_profiles WHERE id = $1 AND account_id = $2`,
    [booking.service_provider_id, requester.id]
  );
  const isProvider = providerResult.rows.length > 0;

  const isUserCancelling =
    Number(booking.customer_user_id) === Number(requester.id) && status === 'cancelled';
  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isProvider && !isUserCancelling && !isAdmin) {
    logger.warn('Booking status update forbidden', {
      bookingId: id,
      requestedStatus: status,
      requesterId: requester.id,
      role: requester.role,
    });
    throw createError(403, 'Forbidden');
  }

  let result;

  try {
    result = await pool.query(
      `UPDATE bookings
       SET booking_status = $2
       WHERE id = $1
       RETURNING *`,
      [id, status]
    );
  } catch (error) {
    logger.error('Booking status update failed', {
      ...errorMeta(error, { includeStack: true }),
      bookingId: id,
      requestedStatus: status,
      requesterId: requester.id,
      role: requester.role,
    });
    throw error;
  }

  logger.info('Booking status updated', {
    bookingId: id,
    status: result.rows[0].booking_status,
    previousStatus: booking.booking_status,
    requesterId: requester.id,
    role: requester.role,
  });

  // ── WhatsApp status notification (non-blocking) ─────────
  const statusNotifyStatuses = ['in_progress', 'completed', 'cancelled', 'rejected'];
  if (statusNotifyStatuses.includes(status)) {
    pool.query('SELECT phone_number FROM accounts WHERE id = $1', [booking.customer_user_id])
      .then((custResult) => {
        const phone = custResult.rows[0]?.phone_number;
        if (phone) {
          whatsapp.sendStatusUpdate(phone, id, status).catch(() => {});
        }
      })
      .catch(() => {});
  }

  return sanitize(result.rows[0]);
}

/**
 * Fetch customer phone and provider WhatsApp number, then send notifications.
 * Called non-blocking after booking creation — never throws to caller.
 */
async function sendBookingNotifications(input, booking, customerUserId) {
  try {
    const [customerResult, providerResult] = await Promise.all([
      pool.query('SELECT phone_number FROM accounts WHERE id = $1', [customerUserId]),
      pool.query(
        `SELECT sp.business_whatsapp_number, sp.business_name
         FROM service_provider_profiles sp
         WHERE sp.id = $1`,
        [input.providerId]
      ),
    ]);

    const customerPhone = customerResult.rows[0]?.phone_number;
    const providerPhone = providerResult.rows[0]?.business_whatsapp_number;
    const businessName = providerResult.rows[0]?.business_name;

    const bookingData = {
      id: booking.id,
      description: booking.description,
      preferred_schedule: booking.preferred_schedule,
      business_name: businessName,
    };

    if (customerPhone) {
      await whatsapp.sendBookingConfirmation(customerPhone, {
        ...bookingData,
        customer_name: `${booking.customer_first_name || ''} ${booking.customer_last_name || ''}`.trim() || 'Customer',
      });
    }

    if (providerPhone) {
      // Get customer name for the provider notification
      const custResult = await pool.query(
        'SELECT first_name, last_name FROM accounts WHERE id = $1',
        [customerUserId]
      );
      const customerName = `${custResult.rows[0]?.first_name || ''} ${custResult.rows[0]?.last_name || ''}`.trim() || 'A customer';
      await whatsapp.sendNewBookingNotification(providerPhone, {
        ...bookingData,
        customer_name: customerName,
      });
    }
  } catch (error) {
    // Already caught at the call site — log here for extra detail
    logger.warn('sendBookingNotifications error', errorMeta(error));
  }
}

module.exports = {
  createBooking,
  getBooking,
  listUserBookings,
  listMechanicBookings,
  updateBookingStatus,
};
