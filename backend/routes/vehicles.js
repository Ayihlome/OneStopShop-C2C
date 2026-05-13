const express = require('express');
const router = express.Router();
const c = require('../controllers/vehicleController');
const { authenticate } = require('../middleware/auth');

router.get('/',     authenticate, c.listVehicles);
router.post('/',    authenticate, c.createVehicle);
router.get('/:id',  authenticate, c.getVehicle);
router.put('/:id',  authenticate, c.updateVehicle);
router.delete('/:id', authenticate, c.deleteVehicle);

module.exports = router;