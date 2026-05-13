const pool = require('../db/pool');

const VALID_TRANSITIONS = {
  pending:     ['accepted', 'cancelled'],
  accepted:    ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed:   [],
  cancelled:   [],
};

exports.create = async ({ userId, mechanicId, vehicleId, description, preferredSchedule }) => {
  // Check mechanic doesn't already have an in_progress booking
  const activeCheck = await pool.query(`
    SELECT id FROM bookings
    WHERE mechanic_id = $1 AND status = 'in_progress'
  `, [mechanicId]);

  if (activeCheck.rows.length > 0) {
    const err = new Error('Mechanic already has an active job in progress');
    err.status = 409;
    throw err;
  }

  const result = await pool.query(`
    INSERT INTO bookings (user_id, mechanic_id, vehicle_id, description, preferred_schedule)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [userId, mechanicId, vehicleId, description, preferredSchedule]);

  return result.rows[0];
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
  return result.rows[0];
};

exports.listByUser = async (userId) => {
  const result = await pool.query(`
    SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC
  `, [userId]);
  return result.rows;
};

exports.listByMechanic = async (mechanicId) => {
  const result = await pool.query(`
    SELECT * FROM bookings WHERE mechanic_id = $1 ORDER BY created_at DESC
  `, [mechanicId]);
  return result.rows;
};

exports.updateStatus = async (id, newStatus) => {
  const booking = await exports.findById(id);
  if (!booking) {
    const err = new Error('Booking not found');
    err.status = 404;
    throw err;
  }

  const allowed = VALID_TRANSITIONS[booking.status];
  if (!allowed.includes(newStatus)) {
    const err = new Error(`Cannot transition from '${booking.status}' to '${newStatus}'`);
    err.status = 400;
    throw err;
  }

  const result = await pool.query(`
    UPDATE bookings
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `, [newStatus, id]);

  return result.rows[0];
};