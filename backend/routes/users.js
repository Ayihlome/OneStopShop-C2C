const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, requireRole } = require('../middleware/auth');
const { photoUpload } = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.use(authenticate, requireRole('user', 'provider'));
router.get('/me', asyncHandler(userController.getMe));
router.put('/me', asyncHandler(userController.updateMe));
router.post(
  '/photo',
  photoUpload.single('photo'),
  asyncHandler(userController.uploadPhoto)
);

module.exports = router;
