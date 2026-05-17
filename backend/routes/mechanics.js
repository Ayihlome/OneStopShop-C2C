const express = require('express');
const { body, query } = require('express-validator');
const mechanicController = require('../controllers/mechanicController');
const { authenticate, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');
const validateDocument = require('../middleware/validateDocument');
const checkDocumentLimit = require('../middleware/checkDocumentLimit');
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
  '/documents',
  authenticate,
  requireRole('mechanic'),
  checkDocumentLimit,
  upload.single('document'),
  validateDocument,
  [
    body('doc_type')
      .isIn(['id', 'certification', 'proof_of_residence'])
      .withMessage('Invalid document type'),
  ],
  validate,
  asyncHandler(mechanicController.uploadDocument)
);

router.get('/:id/whatsapp-contact', asyncHandler(mechanicController.getWhatsappContact));
router.get('/:id/profile', asyncHandler(mechanicController.getMechanicProfile));
router.get('/:id', asyncHandler(mechanicController.getMechanic));

router.put(
  '/:id',
  authenticate,
  [
    body('whatsapp_number')
      .optional({ nullable: true, checkFalsy: true })
      .isMobilePhone('any')
      .withMessage('WhatsApp number must be valid'),
  ],
  validate,
  asyncHandler(mechanicController.updateMechanic)
);

module.exports = router;
