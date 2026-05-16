const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const { authenticate, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post(
  '/',
  authenticate,
  requireRole('user'),
  [
    body('bookingId').isInt({ min: 1 }).withMessage('Valid bookingId is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required'),
  ],
  validate,
  asyncHandler(reviewController.createReview)
);

router.get('/mechanic/:id', asyncHandler(reviewController.getMechanicReviews));
router.get('/user', authenticate, requireRole('user'), asyncHandler(reviewController.getMyReviews));

module.exports = router;
