const pool = require('../db/pool');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

function recipientTypeForRole(role) {
  if (role === 'superadmin' || role === 'moderator') {
    return 'admin';
  }

  return role;
}

async function getNotifications(user) {
  const result = await pool.query(
    `SELECT *
     FROM notifications
     WHERE recipient_id = $1
       AND recipient_type = $2
     ORDER BY created_at DESC`,
    [user.id, recipientTypeForRole(user.role)]
  );

  return sanitize(result.rows);
}

async function markRead(id, user) {
  const result = await pool.query(
    `UPDATE notifications
     SET is_read = true
     WHERE id = $1
       AND recipient_id = $2
       AND recipient_type = $3
     RETURNING *`,
    [id, user.id, recipientTypeForRole(user.role)]
  );

  if (!result.rows[0]) {
    throw createError(404, 'Notification not found');
  }

  return sanitize(result.rows[0]);
}

module.exports = {
  getNotifications,
  markRead,
};
