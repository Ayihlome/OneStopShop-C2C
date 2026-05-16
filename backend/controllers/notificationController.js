const notificationService = require('../services/notificationService');

async function getNotifications(req, res) {
  const data = await notificationService.getNotifications(req.user);
  return res.status(200).json({ data });
}

async function markRead(req, res) {
  const data = await notificationService.markRead(req.params.id, req.user);
  return res.status(200).json({ data, message: 'Success' });
}

module.exports = {
  getNotifications,
  markRead,
};
