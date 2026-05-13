const express = require('express');
const router = express.Router();
const c = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

router.post('/',             authenticate, c.createReview);
router.get('/mechanic/:id',  c.getMechanicReviews);
router.get('/user',          authenticate, c.getUserReviews);

module.exports = router;