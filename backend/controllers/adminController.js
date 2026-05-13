const AdminService = require('../services/adminService');

exports.dashboard = async (req, res) => {
  try {
    const stats = await AdminService.getDashboardStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await AdminService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await AdminService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.listMechanics = async (req, res, next) => {
  try {
    const mechanics = await AdminService.listMechanics();
    res.json(mechanics);
  } catch (err) {
    next(err);
  }
};

exports.deleteMechanic = async (req, res, next) => {
  try {
    await AdminService.deleteMechanic(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.listReports = async (req, res, next) => {
  try {
    const reports = await AdminService.listReports();
    res.json(reports);
  } catch (err) {
    next(err);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    await AdminService.deleteReport(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

