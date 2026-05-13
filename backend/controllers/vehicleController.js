const vehicleService = require('../services/vehicleService');

exports.listVehicles = async (req, res, next) => {
  try {
    res.json(await vehicleService.listByUser(req.user.id));
  } catch (err) { next(err); }
};

exports.getVehicle = async (req, res, next) => {
  try {
    const v = await vehicleService.findById(req.params.id);
    if (!v) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(v);
  } catch (err) { next(err); }
};

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.create(req.user.id, req.body);
    res.status(201).json(vehicle);
  } catch (err) { next(err); }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const updated = await vehicleService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    await vehicleService.delete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};