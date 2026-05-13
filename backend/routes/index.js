const express = require('express');
const router = express.Router();

router.use('/health',        require('./health'));
router.use('/auth',          require('./auth'));
router.use('/users',         require('./users'));
router.use('/mechanics',     require('./mechanics'));
router.use('/bookings',      require('./bookings'));
router.use('/vehicles',      require('./vehicles'));
router.use('/reviews',       require('./reviews'));
router.use('/notifications', require('./notifications'));
router.use('/admin',         require('./admin'));

module.exports = router;