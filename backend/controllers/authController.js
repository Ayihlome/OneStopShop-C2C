const authService = require('../services/authService');

async function signupUser(req, res) {
  const data = await authService.signupUser(req.body);
  return res.status(201).json({ data, message: 'Success' });
}

async function loginUser(req, res) {
  const data = await authService.loginAccount(req.body.email, req.body.password);
  return res.status(200).json({ data, message: 'Success' });
}

async function loginAdmin(req, res) {
  const data = await authService.loginAdmin(req.body.email, req.body.password);
  return res.status(200).json({ data, message: 'Success' });
}

module.exports = {
  signupUser,
  loginUser,
  loginAdmin,
};
