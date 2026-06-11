const express = require('express');
const { body, query } = require('express-validator');
const mechanicController = require('../controllers/mechanicController');
const { authenticate, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { docUpload } = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(mechanicController.listMechanics));
router.get('/search', asyncHandler(mechanicController.searchMechanics));
router.get('/filter', asyncHandler(mechanicController.filterMechanics));
router.get(
  '/nearby',
  [
    query('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude is required'),
    query('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude is required'),
  ],
  validate,
  asyncHandler(mechanicController.findNearby)
);

router.post(
  '/become-provider',
  authenticate,
  [
    body('business_whatsapp_number')
      .isMobilePhone('any')
      .withMessage('A valid WhatsApp business number is required'),
    body('business_name').optional({ nullable: true, checkFalsy: true }).trim(),
    body('service_description').optional({ nullable: true, checkFalsy: true }).trim(),
    body('years_of_experience')
      .optional({ nullable: true, checkFalsy: true })
      .isInt({ min: 0 })
      .withMessage('Years of experience must be a non-negative integer'),
    body('payfast_merchant_id').optional({ nullable: true, checkFalsy: true }).trim(),
    body('payfast_merchant_key').optional({ nullable: true, checkFalsy: true }).trim(),
    body('specialities').optional({ nullable: true }).isArray(),
    body('availability').optional({ nullable: true }).isArray(),
  ],
  validate,
  asyncHandler(mechanicController.createProviderProfile)
);

router.post(
  '/documents',
  authenticate,
  requireRole('provider'),
  docUpload.single('document'),
  [
    body('doc_type')
      .isIn(['id', 'certification', 'proof_of_residence'])
      .withMessage('Invalid document type'),
  ],
  validate,
  asyncHandler(mechanicController.uploadDocument)
);

// Provider dashboard
router.get('/provider/stats', authenticate, asyncHandler(mechanicController.getProviderStats));

router.get('/:id/profile', asyncHandler(mechanicController.getMechanicProfile));
router.get('/:id', asyncHandler(mechanicController.getMechanic));

router.put(
  '/:id',
  authenticate,
  [
    body('business_name').optional({ nullable: true, checkFalsy: true }).trim(),
    body('service_description').optional({ nullable: true, checkFalsy: true }).trim(),
  ],
  validate,
  asyncHandler(mechanicController.updateMechanic)
);

// Availability
router.get('/:id/availability', asyncHandler(mechanicController.getAvailability));
router.put(
  '/:id/availability',
  authenticate,
  asyncHandler(mechanicController.setAvailability)
);
router.post(
  '/:id/availability/exceptions',
  authenticate,
  asyncHandler(mechanicController.addAvailabilityException)
);
router.delete(
  '/:id/availability/exceptions/:exceptionId',
  authenticate,
  asyncHandler(mechanicController.removeAvailabilityException)
);

module.exports = router;
