const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup/user',     authController.signupUser);
router.post('/signup/mechanic', authController.signupMechanic);
router.post('/login/user',      authController.loginUser);
router.post('/login/mechanic',  authController.loginMechanic);
router.post('/login/admin',     authController.loginAdmin);

module.exports = router;