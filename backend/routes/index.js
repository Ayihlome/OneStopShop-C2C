const express = require('express');
const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const bookingRoutes = require('./bookings');
const healthRoutes = require('./health');
const mechanicRoutes = require('./mechanics');
const notificationRoutes = require('./notifications');
const reviewRoutes = require('./reviews');
const userRoutes = require('./users');
const vehicleRoutes = require('./vehicles');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/health', healthRoutes);
router.use('/mechanics', mechanicRoutes);
router.use('/notifications', notificationRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);

module.exports = router;
