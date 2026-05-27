const express = require('express');
const { body } = require('express-validator');
const vehicleController = require('../controllers/vehicleController');
const { authenticate, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

const createVehicleValidators = [
  body('make').trim().notEmpty().withMessage('Make is required'),
  body('model').trim().notEmpty().withMessage('Model is required'),
  body('year_produced')
    .isInt({ min: 1900, max: 2030 })
    .withMessage('Year produced must be between 1900 and 2030'),
  body('license_plate').trim().notEmpty().withMessage('License plate is required'),
];

const updateVehicleValidators = [
  body('make').optional().trim().notEmpty().withMessage('Make cannot be empty'),
  body('model').optional().trim().notEmpty().withMessage('Model cannot be empty'),
  body('year_produced')
    .optional()
    .isInt({ min: 1900, max: 2030 })
    .withMessage('Year produced must be between 1900 and 2030'),
  body('license_plate')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('License plate cannot be empty'),
];

router.use(authenticate, requireRole('user', 'provider'));
router.get('/', asyncHandler(vehicleController.listVehicles));
router.get('/:id', asyncHandler(vehicleController.getVehicle));
router.post('/', createVehicleValidators, validate, asyncHandler(vehicleController.createVehicle));
router.put('/:id', updateVehicleValidators, validate, asyncHandler(vehicleController.updateVehicle));
router.delete('/:id', asyncHandler(vehicleController.deleteVehicle));

module.exports = router;
