const express = require('express');
const router = express.Router();
const c = require('../controllers/mechanicController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/',            c.listMechanics);
router.get('/search',      c.searchMechanics);
router.get('/filter',      c.filterMechanics);
router.get('/nearby',      c.findNearbyMechanics);
router.get('/:id',         c.getMechanic);
router.get('/:id/profile', c.getMechanicProfile);
router.put('/:id',         authenticate, c.updateMechanic);
router.delete('/:id',      authenticate, requireRole('superadmin'), c.deleteMechanic);
router.post('/mechanics/documents', authenticate, c.uploadDocuments);

module.exports = router;