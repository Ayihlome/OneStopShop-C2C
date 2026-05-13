const notificationService = require('../services/notificationService');

exports.getNotifications = async (req, res, next) => {
  try {
    const type = req.user.role === 'mechanic' ? 'mechanic' : 'user';
    res.json(await notificationService.listForRecipient(req.user.id, type));
  } catch (err) { next(err); }
};

exports.markRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markRead(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
  } catch (err) { next(err); }
};