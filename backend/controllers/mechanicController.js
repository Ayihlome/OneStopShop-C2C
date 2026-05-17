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

async function getWhatsappContact(req, res) {
  const data = await mechanicService.getWhatsappContact(req.params.id, req.query);
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

  if (req.user.role === 'mechanic' && Number(req.user.id) !== targetId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!isAdmin && req.user.role !== 'mechanic') {
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

module.exports = {
  listMechanics,
  getMechanic,
  getMechanicProfile,
  getWhatsappContact,
  searchMechanics,
  filterMechanics,
  findNearby,
  updateMechanic,
  uploadDocument,
};
