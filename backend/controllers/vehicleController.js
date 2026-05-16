const vehicleService = require('../services/vehicleService');

async function listVehicles(req, res) {
  const data = await vehicleService.listVehicles(req.user.id);
  return res.status(200).json({ data });
}

async function getVehicle(req, res) {
  const data = await vehicleService.getVehicle(req.params.id, req.user.id);
  return res.status(200).json({ data });
}

async function createVehicle(req, res) {
  const data = await vehicleService.createVehicle(req.user.id, req.body);
  return res.status(201).json({ data, message: 'Success' });
}

async function updateVehicle(req, res) {
  const data = await vehicleService.updateVehicle(req.params.id, req.user.id, req.body);
  return res.status(200).json({ data, message: 'Success' });
}

async function deleteVehicle(req, res) {
  const data = await vehicleService.deleteVehicle(req.params.id, req.user.id);
  return res.status(200).json({ data, message: 'Success' });
}

module.exports = {
  listVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
