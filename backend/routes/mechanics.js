import express from 'express';
import mechanicController from '../controllers/mechanicController';

const router = express.Router();

router.get('/', mechanicController.listMechanics);
router.get('/findMech/:id', mechanicController.getMechanic);
router.post('/createMech', mechanicController.createMechanic);
router.put('/updateMech/:id', mechanicController.updateMechanic);
router.delete('/deleteMech/:id', mechanicController.deleteMechanic);
router.get('/search', mechanicController.searchMechanics);
router.get('/filter', mechanicController.filterMechanics);
router.get('/nearby', mechanicController.findNearbyMechanics);
router.get('/profile/:id', mechanicController.getMechanicProfile);

export default router;