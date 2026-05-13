const pool = require('../db/pool');

exports.create = async ({ recipientId, recipientType, message }) => {
  const result = await pool.query(`
    INSERT INTO notifications (recipient_id, recipient_type, message)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [recipientId, recipientType, message]);
  return result.rows[0];
};

exports.listForRecipient = async (recipientId, recipientType) => {
  const result = await pool.query(`
    SELECT * FROM notifications
    WHERE recipient_id = $1 AND recipient_type = $2
    ORDER BY created_at DESC
  `, [recipientId, recipientType]);
  return result.rows;
};

exports.markRead = async (id) => {
  const result = await pool.query(`
    UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *
  `, [id]);
  return result.rows[0];
};