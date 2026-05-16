const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, requireRole } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(authenticate, requireRole('user'));
router.get('/me', asyncHandler(userController.getMe));
router.put('/me', asyncHandler(userController.updateMe));

module.exports = router;
