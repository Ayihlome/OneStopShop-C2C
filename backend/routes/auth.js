const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

const signupValidators = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('phone_number')
    .optional({ nullable: true, checkFalsy: true })
    .isMobilePhone('any')
    .withMessage('Phone number must be valid'),
];

const loginValidators = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post(
  '/signup/user',
  signupValidators,
  validate,
  asyncHandler(authController.signupUser)
);

router.post(
  '/signup/mechanic',
  [
    ...signupValidators,
    body('whatsapp_number')
      .optional({ nullable: true, checkFalsy: true })
      .isMobilePhone('any')
      .withMessage('WhatsApp number must be valid'),
  ],
  validate,
  asyncHandler(authController.signupMechanic)
);

router.post(
  '/login/user',
  loginValidators,
  validate,
  asyncHandler(authController.loginUser)
);

router.post(
  '/login/mechanic',
  loginValidators,
  validate,
  asyncHandler(authController.loginMechanic)
);

router.post(
  '/login/admin',
  loginValidators,
  validate,
  asyncHandler(authController.loginAdmin)
);

module.exports = router;
