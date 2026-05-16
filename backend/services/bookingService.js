const pool = require('../db/pool');
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
    return sanitize(booking.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
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
    throw createError(404, 'Booking not found');
  }

  const isOwner = Number(booking.user_id) === Number(requester.id);
  const isMechanic = Number(booking.mechanic_id) === Number(requester.id);
  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isOwner && !isMechanic && !isAdmin) {
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
    throw createError(404, 'Booking not found');
  }

  const isMechanic = Number(booking.mechanic_id) === Number(requester.id);
  const isUserCancelling =
    Number(booking.user_id) === Number(requester.id) && status === 'cancelled';
  const isAdmin = ['moderator', 'superadmin'].includes(requester.role);

  if (!isMechanic && !isUserCancelling && !isAdmin) {
    throw createError(403, 'Forbidden');
  }

  const result = await pool.query(
    `UPDATE bookings
     SET status = $2
     WHERE id = $1
     RETURNING *`,
    [id, status]
  );

  return sanitize(result.rows[0]);
}

module.exports = {
  createBooking,
  getBooking,
  listUserBookings,
  listMechanicBookings,
  updateBookingStatus,
};
