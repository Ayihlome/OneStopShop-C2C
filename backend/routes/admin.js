const express = require('express');
const adminController = require('../controllers/adminController');
const { isMod, isSuperAdmin } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.get('/dashboard', ...isMod, asyncHandler(adminController.getDashboard));
router.get('/users', ...isMod, asyncHandler(adminController.listUsers));
router.delete('/users/:id', ...isSuperAdmin, asyncHandler(adminController.deleteUser));
router.get('/mechanics', ...isMod, asyncHandler(adminController.listMechanics));
router.delete('/mechanics/:id', ...isSuperAdmin, asyncHandler(adminController.deleteMechanic));
router.patch('/mechanics/:id/verify', ...isSuperAdmin, asyncHandler(adminController.verifyMechanic));
router.patch('/accounts/:id/suspend', ...isSuperAdmin, asyncHandler(adminController.suspendAccount));
router.get('/documents', ...isMod, asyncHandler(adminController.listPendingDocuments));
router.patch('/documents/:id/approve', ...isSuperAdmin, asyncHandler(adminController.approveDocument));
router.patch('/documents/:id/reject', ...isSuperAdmin, asyncHandler(adminController.rejectDocument));
router.get('/payments', ...isMod, asyncHandler(adminController.listPayments));

module.exports = router;
