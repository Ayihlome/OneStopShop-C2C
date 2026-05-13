import express from 'express';
import amdinController from '../controllers/adminController';

const router = express.Router();

router.get('/dashboard', amdinController.getDashboard);
router.get('/users', amdinController.listUsers);
router.get('/users/:id', amdinController.getUser);
router.delete('/users/:id', amdinController.deleteUser);
router.get('/mechanics', amdinController.listMechanics);
router.get('/mechanics/:id', amdinController.getMechanic);
router.delete('/mechanics/:id', amdinController.deleteMechanic);
router.get('/reports', amdinController.listReports);
router.get('/reports/:id', amdinController.getReport);
router.delete('/reports/:id', amdinController.deleteReport);