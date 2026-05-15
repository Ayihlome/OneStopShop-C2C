const express = require('express');
const router = express.Router();
const c = require('../controllers/adminController');
const { authenticate, requireRole } = require('../middleware/auth');

const isMod = [authenticate, requireRole('superadmin', 'moderator')];
const isSuperAdmin = [authenticate, requireRole('superadmin')];

router.get('/dashboard',              ...isMod,        c.dashboard);
router.get('/users',                  ...isMod,        c.listUsers);
router.delete('/users/:id',           ...isSuperAdmin, c.deleteUser);
router.get('/mechanics',              ...isMod,        c.listMechanics);
router.delete('/mechanics/:id',       ...isSuperAdmin, c.deleteMechanic);
router.patch('/mechanics/:id/verify', ...isSuperAdmin, c.verifyMechanic);
router.patch('/accounts/:id/suspend', ...isSuperAdmin, c.suspendAccount);
router.get('/reports',                ...isMod,        c.listReports);
router.delete('/reports/:id',         ...isSuperAdmin, c.deleteReport);
router.get('/admin/documents',      ...isMod,        c.listDocuments);
router.patch('/admin/documents/:id/approve', ...isSuperAdmin, c.approveDocument);
router.patch('/admin/documents/:id/reject',  ...isSuperAdmin, c.rejectDocument);

module.exports = router;