const pool = require('../db/pool');
const logger = require('../utils/logger');
const { errorMeta } = require('../utils/logging');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

async function createReview(userId, input) {
  const bookingResult = await pool.query(
    `SELECT *
     FROM bookings
     WHERE id = $1
       AND customer_user_id = $2`,
    [input.bookingId, userId]
  );
  const booking = bookingResult.rows[0];

  if (!booking) {
    logger.warn('Review creation failed because booking was not found for user', {
      bookingId: input.bookingId,
      userId,
    });
    throw createError(400, 'Booking not found for this user');
  }

  if (booking.booking_status !== 'completed') {
    logger.warn('Review creation failed because booking is not completed', {
      bookingId: input.bookingId,
      userId,
      status: booking.booking_status,
    });
    throw createError(400, 'Only completed bookings can be reviewed');
  }

  try {
    const result = await pool.query(
      `INSERT INTO reviews (booking_id, reviewer_user_id, service_provider_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        input.bookingId,
        userId,
        booking.service_provider_id,
        input.rating,
        input.comment,
      ]
    );

    logger.info('Review created', {
      reviewId: result.rows[0].id,
      bookingId: input.bookingId,
      userId,
      serviceProviderId: booking.service_provider_id,
      rating: input.rating,
    });

    return sanitize(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      logger.warn('Review creation failed because booking was already reviewed', {
        ...errorMeta(error),
        bookingId: input.bookingId,
        userId,
      });
      throw createError(409, 'This booking has already been reviewed');
    }

    logger.error('Review creation failed', {
      ...errorMeta(error, { includeStack: true }),
      bookingId: input.bookingId,
      userId,
      serviceProviderId: booking.service_provider_id,
    });
    throw error;
  }
}

async function getMechanicReviews(accountId) {
  const result = await pool.query(
    `SELECT
       r.*,
       a.first_name AS user_first_name,
       a.last_name AS user_last_name
     FROM reviews r
     INNER JOIN service_provider_profiles sp ON sp.id = r.service_provider_id
     INNER JOIN accounts a ON a.id = r.reviewer_user_id
     WHERE sp.account_id = $1
     ORDER BY r.created_at DESC`,
    [accountId]
  );

  logger.debug('Provider reviews listed', {
    accountId,
    count: result.rowCount,
  });

  return sanitize(result.rows);
}

async function getUserReviews(userId) {
  const result = await pool.query(
    `SELECT
       r.*,
       a.first_name AS provider_first_name,
       a.last_name AS provider_last_name,
       sp.business_name
     FROM reviews r
     INNER JOIN service_provider_profiles sp ON sp.id = r.service_provider_id
     INNER JOIN accounts a ON a.id = sp.account_id
     WHERE r.reviewer_user_id = $1
     ORDER BY r.created_at DESC`,
    [userId]
  );

  logger.debug('User reviews listed', {
    userId,
    count: result.rowCount,
  });

  return sanitize(result.rows);
}

module.exports = {
  createReview,
  getMechanicReviews,
  getUserReviews,
};
