const pool = require('../db/pool');

exports.getDashboardStats = async () => {
  const [users, mechanics, bookings, reviews] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM users'),
    pool.query('SELECT COUNT(*) FROM mechanics'),
    pool.query('SELECT status, COUNT(*) FROM bookings GROUP BY status'),
    pool.query('SELECT COUNT(*) AS total, ROUND(AVG(rating), 2) AS avg_rating FROM reviews'),
  ]);

  const bookingsByStatus = {};
  bookings.rows.forEach(r => { bookingsByStatus[r.status] = parseInt(r.count); });

  return {
    total_users:     parseInt(users.rows[0].count),
    total_mechanics: parseInt(mechanics.rows[0].count),
    bookings:        bookingsByStatus,
    total_reviews:   parseInt(reviews.rows[0].total),
    avg_rating:      parseFloat(reviews.rows[0].avg_rating),
  };
};

exports.listUsers = async () => {
  const result = await pool.query(`
    SELECT a.id, a.first_name, a.last_name, a.email, a.phone_number,
           a.city, a.town, a.status, a.created_at
    FROM accounts a INNER JOIN users u ON u.account_id = a.id
    ORDER BY a.created_at DESC
  `);
  return result.rows;
};

exports.deleteUser = async (id) => {
  await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
};

exports.listMechanics = async () => {
  const result = await pool.query(`
    SELECT a.id, a.first_name, a.last_name, a.email, a.status,
           m.bio, m.years_experience, m.is_available, m.verification_badge
    FROM accounts a INNER JOIN mechanics m ON m.account_id = a.id
    ORDER BY a.created_at DESC
  `);
  return result.rows;
};

exports.deleteMechanic = async (id) => {
  await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
};

exports.verifyMechanic = async (id) => {
  const result = await pool.query(`
    UPDATE mechanics SET verification_badge = true WHERE account_id = $1 RETURNING *
  `, [id]);
  return result.rows[0];
};

exports.suspendAccount = async (id) => {
  const result = await pool.query(`
    UPDATE accounts SET status = 'suspended', updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 RETURNING id, email, status
  `, [id]);
  return result.rows[0];
};

exports.listReports = async () => {
  // Returns reviews with rating <= 2 as flagged content
  const result = await pool.query(`
    SELECT r.*, a.first_name, a.last_name, a.email
    FROM reviews r
    INNER JOIN accounts a ON a.id = r.user_id
    WHERE r.rating <= 2
    ORDER BY r.created_at DESC
  `);
  return result.rows;
};

exports.deleteReport = async (id) => {
  await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
};