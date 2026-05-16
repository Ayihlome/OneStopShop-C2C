const userService = require('../services/userService');

async function getMe(req, res) {
  const data = await userService.getUser(req.user.id);
  return res.status(200).json({ data });
}

async function updateMe(req, res) {
  const data = await userService.updateUser(req.user.id, req.body);
  return res.status(200).json({ data, message: 'Success' });
}

module.exports = {
  getMe,
  updateMe,
};
