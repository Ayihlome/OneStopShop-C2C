const AdminService = require('../services/adminService');

exports.dashboard = async (req, res, next) => {
  try {
    res.json(await AdminService.getDashboardStats());
  } catch (err) { next(err); }
};

exports.listUsers = async (req, res, next) => {
  try {
    res.json(await AdminService.listUsers());
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await AdminService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

exports.listMechanics = async (req, res, next) => {
  try {
    res.json(await AdminService.listMechanics());
  } catch (err) { next(err); }
};

exports.deleteMechanic = async (req, res, next) => {
  try {
    await AdminService.deleteMechanic(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

exports.verifyMechanic = async (req, res, next) => {
  try {
    const result = await AdminService.verifyMechanic(req.params.id);
    if (!result) return res.status(404).json({ error: 'Mechanic not found' });
    res.json({ message: 'Mechanic verified', result });
  } catch (err) { next(err); }
};

exports.suspendAccount = async (req, res, next) => {
  try {
    const result = await AdminService.suspendAccount(req.params.id);
    if (!result) return res.status(404).json({ error: 'Account not found' });
    res.json({ message: 'Account suspended', result });
  } catch (err) { next(err); }
};

exports.listReports = async (req, res, next) => {
  try {
    res.json(await AdminService.listReports());
  } catch (err) { next(err); }
};

exports.deleteReport = async (req, res, next) => {
  try {
    await AdminService.deleteReport(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};