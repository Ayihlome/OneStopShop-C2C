const userService = require('../services/userService');

async function getMe(req, res) {
  const data = await userService.getUser(req.user.id);
  return res.status(200).json({ data });
}

async function updateMe(req, res) {
  const data = await userService.updateUser(req.user.id, req.body);
  return res.status(200).json({ data, message: 'Success' });
}

async function uploadPhoto(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No photo file provided' });
  }
  const photoUrl = `/uploads/photos/${req.file.filename}`;
  const data = await userService.updateUser(req.user.id, { profile_photo_url: photoUrl });
  return res.status(200).json({ data, message: 'Photo uploaded' });
}

module.exports = {
  getMe,
  updateMe,
  uploadPhoto,
};
