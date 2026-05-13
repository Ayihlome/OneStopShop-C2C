const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/',     authenticate, requireRole('superadmin', 'moderator'), userController.listUsers);
router.get('/:id',  authenticate, userController.getUser);
router.put('/:id',  authenticate, userController.updateUser);
router.delete('/:id', authenticate, requireRole('superadmin'), userController.deleteUser);

module.exports = router;