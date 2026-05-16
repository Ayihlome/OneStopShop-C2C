const pool = require('../db/pool');
const logger = require('../utils/logger');
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

  logger.debug('Notifications listed', {
    userId: user.id,
    role: user.role,
    count: result.rowCount,
  });

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
    logger.warn('Notification mark-read failed because notification was not found', {
      notificationId: id,
      userId: user.id,
      role: user.role,
    });
    throw createError(404, 'Notification not found');
  }

  logger.info('Notification marked read', {
    notificationId: id,
    userId: user.id,
    role: user.role,
  });

  return sanitize(result.rows[0]);
}

module.exports = {
  getNotifications,
  markRead,
};
