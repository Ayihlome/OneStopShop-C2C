const express = require('express');
const router = express.Router();
const c = require('../controllers/bookingController');
const { authenticate } = require('../middleware/auth');

router.post('/',              authenticate, c.createBooking);
router.get('/user',           authenticate, c.listUserBookings);
router.get('/mechanic',       authenticate, c.listMechanicBookings);
router.get('/:id',            authenticate, c.getBooking);
router.patch('/:id/status',   authenticate, c.updateBookingStatus);

module.exports = router;