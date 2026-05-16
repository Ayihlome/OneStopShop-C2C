const pool = require('../db/pool');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

async function createReview(userId, input) {
  const bookingResult = await pool.query(
    `SELECT *
     FROM bookings
     WHERE id = $1
       AND user_id = $2`,
    [input.bookingId, userId]
  );
  const booking = bookingResult.rows[0];

  if (!booking) {
    throw createError(400, 'Booking not found for this user');
  }

  if (booking.status !== 'completed') {
    throw createError(400, 'Only completed bookings can be reviewed');
  }

  try {
    const result = await pool.query(
      `INSERT INTO reviews (booking_id, user_id, mechanic_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        input.bookingId,
        userId,
        booking.mechanic_id,
        input.rating,
        input.comment,
      ]
    );

    return sanitize(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      throw createError(409, 'This booking has already been reviewed');
    }

    throw error;
  }
}

async function getMechanicReviews(mechanicId) {
  const result = await pool.query(
    `SELECT
       r.*,
       a.first_name AS user_first_name,
       a.last_name AS user_last_name
     FROM reviews r
     INNER JOIN accounts a ON a.id = r.user_id
     WHERE r.mechanic_id = $1
     ORDER BY r.created_at DESC`,
    [mechanicId]
  );

  return sanitize(result.rows);
}

async function getUserReviews(userId) {
  const result = await pool.query(
    `SELECT
       r.*,
       a.first_name AS mechanic_first_name,
       a.last_name AS mechanic_last_name
     FROM reviews r
     INNER JOIN accounts a ON a.id = r.mechanic_id
     WHERE r.user_id = $1
     ORDER BY r.created_at DESC`,
    [userId]
  );

  return sanitize(result.rows);
}

module.exports = {
  createReview,
  getMechanicReviews,
  getUserReviews,
};
