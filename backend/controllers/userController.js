const userService = require('../services/userService');

exports.listUsers = async (req, res, next) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (err) { next(err); }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updated = await userService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};