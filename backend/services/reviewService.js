const pool = require('../db/pool');

exports.create = async ({ bookingId, userId, mechanicId, rating, comment }) => {
  // Only allow review if booking is completed
  const bookingResult = await pool.query(
    'SELECT status FROM bookings WHERE id = $1',
    [bookingId]
  );
  const booking = bookingResult.rows[0];
  if (!booking) {
    const err = new Error('Booking not found');
    err.status = 404;
    throw err;
  }
  if (booking.status !== 'completed') {
    const err = new Error('Can only review a completed booking');
    err.status = 400;
    throw err;
  }

  const result = await pool.query(`
    INSERT INTO reviews (booking_id, user_id, mechanic_id, rating, comment)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [bookingId, userId, mechanicId, rating, comment]);
  return result.rows[0];
};

exports.findByMechanic = async (mechanicId) => {
  const result = await pool.query(`
    SELECT r.*, a.first_name, a.last_name
    FROM reviews r
    INNER JOIN accounts a ON a.id = r.user_id
    WHERE r.mechanic_id = $1
    ORDER BY r.created_at DESC
  `, [mechanicId]);
  return result.rows;
};

exports.findByUser = async (userId) => {
  const result = await pool.query(`
    SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC
  `, [userId]);
  return result.rows;
};