const pool = require('../db/pool');
const logger = require('../utils/logger');
const { errorMeta } = require('../utils/logging');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

const BOOKING_SELECT = `
  SELECT
    b.*,
    ua.first_name AS user_first_name,
    ua.last_name AS user_last_name,
    ma.first_name AS mechanic_first_name,
    ma.last_name AS mechanic_last_name,
    v.make AS vehicle_make,
    v.model AS vehicle_model,
    v.license_plate
  FROM bookings b
  INNER JOIN accounts ua ON ua.id = b.user_id
  INNER JOIN accounts ma ON ma.id = b.mechanic_id
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

async function ensureMechanicExists(mechanicId) {
  const result = await pool.query(
    `SELECT account_id
     FROM mechanics
     WHERE account_id = $1`,
    [mechanicId]
  );

  if (!result.rows[0]) {
    logger.warn('Booking validation failed because mechanic was not found', {
      mechanicId,
    });
    throw createError(400, 'Mechanic not found');
  }
}

async function createBooking(userId, input) {
  await ensureVehicleBelongsToUser(input.vehicleId, userId);
  await ensureMechanicExists(input.mechanicId);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const booking = await client.query(
      `INSERT INTO bookings (
         user_id, mechanic_id, vehicle_id, description, preferred_schedule
       )
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userId,
        input.mechanicId,
        input.vehicleId,
        input.description,
        input.preferredSchedule,
      ]
    );

    await client.query(
      `INSERT INTO notifications (recipient_id, recipient_type, message)
       VALUES ($1, 'mechanic', $2)`,
      [
        input.mechanicId,
        `New booking request #${booking.rows[0].id}`,
      ]
    );

    await client.query('COMMIT');
    logger.info('Booking created', {
      bookingId: booking.rows[0].id,
      userId,
      mechanicId: input.mechanicId,
      vehicleId: input.vehicleId,
      status: booking.rows[0].status,
    });

    return sanitize(booking.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Booking creation rolled back', {
      ...errorMeta(error, { includeStack: true }),
      userId,
      mechanicId: input.mechanicId,
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

  const isOwner = Number(booking.user_id) === Number(requester.id);
  const isMechanic = Number(booking.mechanic_id) === Number(requester.id);
  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isOwner && !isMechanic && !isAdmin) {
    logger.warn('Booking access forbidden', {
      bookingId: id,
      requesterId: requester.id,
      role: requester.role,
    });
    throw createError(403, 'Forbidden');
  }

  return sanitize(booking);
}

async function listUserBookings(userId) {
  const result = await pool.query(
    `${BOOKING_SELECT}
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId]
  );

  return sanitize(result.rows);
}

async function listMechanicBookings(mechanicId) {
  const result = await pool.query(
    `${BOOKING_SELECT}
     WHERE b.mechanic_id = $1
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

  const isMechanic = Number(booking.mechanic_id) === Number(requester.id);
  const isUserCancelling =
    Number(booking.user_id) === Number(requester.id) && status === 'cancelled';
  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isMechanic && !isUserCancelling && !isAdmin) {
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
       SET status = $2
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
    status: result.rows[0].status,
    previousStatus: booking.status,
    requesterId: requester.id,
    role: requester.role,
  });

  return sanitize(result.rows[0]);
}

module.exports = {
  createBooking,
  getBooking,
  listUserBookings,
  listMechanicBookings,
  updateBookingStatus,
};
