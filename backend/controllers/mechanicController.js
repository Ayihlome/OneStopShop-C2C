const mechanicService = require('../services/mechanicService');

exports.listMechanics = async (req, res, next) => {
  try {
    res.json(await mechanicService.list());
  } catch (err) { next(err); }
};

exports.getMechanic = async (req, res, next) => {
  try {
    const m = await mechanicService.findById(req.params.id);
    if (!m) return res.status(404).json({ error: 'Mechanic not found' });
    res.json(m);
  } catch (err) { next(err); }
};

exports.getMechanicProfile = async (req, res, next) => {
  try {
    const profile = await mechanicService.getProfile(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Mechanic not found' });
    res.json(profile);
  } catch (err) { next(err); }
};

exports.updateMechanic = async (req, res, next) => {
  try {
    const updated = await mechanicService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Mechanic not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteMechanic = async (req, res, next) => {
  try {
    await mechanicService.delete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

exports.searchMechanics = async (req, res, next) => {
  try {
    res.json(await mechanicService.search(req.query.query || ''));
  } catch (err) { next(err); }
};

exports.filterMechanics = async (req, res, next) => {
  try {
    res.json(await mechanicService.filter(req.query));
  } catch (err) { next(err); }
};

exports.findNearbyMechanics = async (req, res, next) => {
  try {
    res.json(await mechanicService.findNearby(req.query.lat, req.query.lng));
  } catch (err) { next(err); }
};