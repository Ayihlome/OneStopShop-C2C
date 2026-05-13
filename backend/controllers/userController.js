const userService = require('../services/userService');

exports.listUsers = (req, res, next) => {
  try {
    const users = userService.list();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  try {
    const user = userService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const created = userService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const user = userService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const updated = userService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const user = userService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    userService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.signup = (req, res, next) => {
  try {
    const created = userService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = userService.findByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.password !== password) return res.status(401).json({ error: 'Invalid password' });
    res.json({ message: 'Login successful', user });
  } catch (err) {
    next(err);
  }
};
