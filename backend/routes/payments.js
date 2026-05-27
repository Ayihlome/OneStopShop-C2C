const express = require('express');
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Customer initiates payment for their booking
router.post(
  '/booking/:bookingId/initiate',
  authenticate,
  asyncHandler(paymentController.initiatePayment)
);

// PayFast ITN webhook — no auth, PayFast calls this after payment
// Must use express.urlencoded because PayFast sends form-encoded data
router.post(
  '/itn',
  express.urlencoded({ extended: false }),
  asyncHandler(paymentController.itnCallback)
);

// Customer checks payment status and receives WhatsApp URL if paid
router.get(
  '/booking/:bookingId/status',
  authenticate,
  asyncHandler(paymentController.getPaymentStatus)
);

module.exports = router;
