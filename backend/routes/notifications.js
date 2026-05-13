const express = require('express');
const router = express.Router();
const c = require('../controllers/notificationController');
const { authenticate } = require('../middleware/auth');

router.get('/',          authenticate, c.getNotifications);
router.patch('/:id/read', authenticate, c.markRead);

module.exports = router;