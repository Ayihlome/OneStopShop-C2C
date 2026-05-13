const MechanicService = require('../services/mechanicService');

exports.listMechanics = (req, res, next) => {
  try {
    const mechanics = MechanicService.list();
    res.json(mechanics);
  } catch (err) {
    next(err);
  }
};

exports.getMechanic = (req, res, next) => {
  try {
    const mechanic = MechanicService.findById(req.params.id);
    if (!mechanic) return res.status(404).json({ error: 'Mechanic not found' });
    res.json(mechanic);
  } catch (err) {
    next(err);
  }
};

exports.createMechanic = (req, res, next) => {
  try {
    const created = MechanicService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.updateMechanic = (req, res, next) => {
    try {
        const mechanic = MechanicService.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: 'Mechanic not found' });
        const updated = MechanicService.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteMechanic = (req, res, next) => {
    try {
        const mechanic = MechanicService.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: 'Mechanic not found' });
        MechanicService.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.searchMechanics = (req, res, next) => {
    try {
        const { query } = req.query;
        const results = MechanicService.search(query);
        res.json(results);
    } catch (err) {
        next(err);
    }
};

exports.filterMechanics = (req, res, next) => {
    try {
        const { specialty, location } = req.query;
        const results = MechanicService.filter({ specialty, location });
        res.json(results);
    } catch (err) {
        next(err);
    }
};

exports.findNearbyMechanics = (req, res, next) => {
    try {
        const { lat, lng } = req.query;
        const results = MechanicService.findNearby(lat, lng);
        res.json(results);
    } catch (err) {
        next(err);
    }
};

exports.getMechanicProfile = (req, res, next) => {
    try {
        const mechanic = MechanicService.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: 'Mechanic not found' });
        res.json(mechanic);
    } catch (err) {
        next(err);
    }
};

