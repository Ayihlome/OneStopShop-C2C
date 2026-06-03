const mechanicService = require('../services/mechanicService');

async function listMechanics(req, res) {
  const data = await mechanicService.listMechanics();
  return res.status(200).json({ data });
}

async function getMechanic(req, res) {
  const data = await mechanicService.getMechanic(req.params.id);
  return res.status(200).json({ data });
}

async function getMechanicProfile(req, res) {
  const data = await mechanicService.getProfile(req.params.id);
  return res.status(200).json({ data });
}

async function getProviderStats(req, res) {
  const data = await mechanicService.getProviderStats(req.user.id);
  return res.status(200).json({ data });
}

async function searchMechanics(req, res) {
  const data = await mechanicService.searchMechanics(req.query.query || '');
  return res.status(200).json({ data });
}

async function filterMechanics(req, res) {
  const data = await mechanicService.filterMechanics(req.query);
  return res.status(200).json({ data });
}

async function findNearby(req, res) {
  const data = await mechanicService.findNearby(Number(req.query.lat), Number(req.query.lng));
  return res.status(200).json({ data });
}

async function updateMechanic(req, res) {
  const targetId = Number(req.params.id);
  const isAdmin = ['moderator', 'superadmin'].includes(req.user.role);

  if (req.user.role === 'provider' && Number(req.user.id) !== targetId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!isAdmin && req.user.role !== 'provider') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const data = await mechanicService.update(targetId, req.body);
  return res.status(200).json({ data, message: 'Success' });
}

async function uploadDocument(req, res) {
  const data = await mechanicService.uploadDocument(
    req.user.id,
    req.body.doc_type,
    req.file
  );
  return res.status(201).json({ data, message: 'Success' });
}

async function createProviderProfile(req, res) {
  const data = await mechanicService.createProviderProfile(req.user.id, req.body);

  // Issue a new token reflecting the provider role
  const newToken = require('../services/authService').signToken({
    id: req.user.id,
    email: req.user.email,
    role: 'provider',
  });

  return res.status(201).json({ data, token: newToken, message: 'Success' });
}

// =================================================================
// AVAILABILITY CONTROLLERS
// =================================================================

async function getAvailability(req, res) {
  const data = await mechanicService.getAvailability(Number(req.params.id));
  return res.status(200).json({ data });
}

async function setAvailability(req, res) {
  const data = await mechanicService.setAvailability(req.user.id, req.body.slots);
  return res.status(200).json({ data, message: 'Availability updated' });
}

async function addAvailabilityException(req, res) {
  const data = await mechanicService.addAvailabilityException(
    req.user.id,
    req.body.date,
    req.body.reason
  );
  return res.status(201).json({ data });
}

async function removeAvailabilityException(req, res) {
  await mechanicService.removeAvailabilityException(req.user.id, Number(req.params.exceptionId));
  return res.status(200).json({ message: 'Exception removed' });
}

module.exports = {
  listMechanics,
  getMechanic,
  getMechanicProfile,
  getProviderStats,
  searchMechanics,
  filterMechanics,
  findNearby,
  updateMechanic,
  uploadDocument,
  createProviderProfile,
  getAvailability,
  setAvailability,
  addAvailabilityException,
  removeAvailabilityException,
};
