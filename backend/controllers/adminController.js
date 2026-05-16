const adminService = require('../services/adminService');

async function getDashboard(req, res) {
  const data = await adminService.getDashboardStats();
  return res.status(200).json({ data });
}

async function listUsers(req, res) {
  const data = await adminService.listUsers();
  return res.status(200).json({ data });
}

async function deleteUser(req, res) {
  const data = await adminService.deleteUser(req.params.id);
  return res.status(200).json({ data, message: 'Success' });
}

async function listMechanics(req, res) {
  const data = await adminService.listMechanics();
  return res.status(200).json({ data });
}

async function deleteMechanic(req, res) {
  const data = await adminService.deleteMechanic(req.params.id);
  return res.status(200).json({ data, message: 'Success' });
}

async function verifyMechanic(req, res) {
  const data = await adminService.verifyMechanic(req.params.id);
  return res.status(200).json({ data, message: 'Success' });
}

async function suspendAccount(req, res) {
  const data = await adminService.suspendAccount(req.params.id);
  return res.status(200).json({ data, message: 'Success' });
}

async function listPendingDocuments(req, res) {
  const data = await adminService.listPendingDocuments();
  return res.status(200).json({ data });
}

async function approveDocument(req, res) {
  const data = await adminService.approveDocument(req.params.id, req.user.id);
  return res.status(200).json({ data, message: 'Success' });
}

async function rejectDocument(req, res) {
  const data = await adminService.rejectDocument(req.params.id, req.user.id);
  return res.status(200).json({ data, message: 'Success' });
}

module.exports = {
  getDashboard,
  listUsers,
  deleteUser,
  listMechanics,
  deleteMechanic,
  verifyMechanic,
  suspendAccount,
  listPendingDocuments,
  approveDocument,
  rejectDocument,
};
