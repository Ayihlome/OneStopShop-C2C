const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const { authenticate, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post(
  '/',
  authenticate,
  requireRole('user', 'provider'),
  [
    body('providerId').isInt({ min: 1 }).withMessage('Valid providerId is required'),
    body('vehicleId').isInt({ min: 1 }).withMessage('Valid vehicleId is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('preferredSchedule')
      .isISO8601()
      .withMessage('Preferred schedule must be an ISO 8601 date'),
  ],
  validate,
  asyncHandler(bookingController.createBooking)
);

router.get('/user', authenticate, asyncHandler(bookingController.listMyBookings));
router.get(
  '/mechanic',
  authenticate,
  requireRole('provider'),
  asyncHandler(bookingController.listMechanicBookings)
);
router.get('/:id', authenticate, asyncHandler(bookingController.getBooking));

router.patch(
  '/:id/status',
  authenticate,
  [
    body('status')
      .isIn(['in_progress', 'completed', 'cancelled', 'rejected'])
      .withMessage('Invalid booking status'),
  ],
  validate,
  asyncHandler(bookingController.updateBookingStatus)
);

module.exports = router;
