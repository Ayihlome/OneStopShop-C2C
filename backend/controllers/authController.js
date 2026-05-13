const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const mechanicService = require('../services/mechanicService');
const pool = require('../db/pool');

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// ── User ──────────────────────────────────────────────
exports.signupUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    const token = signToken({ id: user.id, role: 'user' });
    res.status(201).json({ token, user });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const account = await userService.findByEmail(email);
    if (!account) return res.status(401).json({ error: 'Invalid credentials' });
    if (account.status === 'suspended') return res.status(403).json({ error: 'Account suspended' });

    const valid = await bcrypt.compare(password, account.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const { password_hash, ...user } = account;
    const token = signToken({ id: user.id, role: 'user' });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

// ── Mechanic ──────────────────────────────────────────
exports.signupMechanic = async (req, res, next) => {
  try {
    const mechanic = await mechanicService.create(req.body);
    const token = signToken({ id: mechanic.id, role: 'mechanic' });
    res.status(201).json({ token, mechanic });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    next(err);
  }
};

exports.loginMechanic = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const account = await mechanicService.findByEmail(email);
    if (!account) return res.status(401).json({ error: 'Invalid credentials' });
    if (account.status === 'suspended') return res.status(403).json({ error: 'Account suspended' });

    const valid = await bcrypt.compare(password, account.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const { password_hash, ...mechanic } = account;
    const token = signToken({ id: mechanic.id, role: 'mechanic' });
    res.json({ token, mechanic });
  } catch (err) {
    next(err);
  }
};

// ── Admin ─────────────────────────────────────────────
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = result.rows[0];
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ id: admin.id, role: admin.role });
    res.json({ token, admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role } });
  } catch (err) {
    next(err);
  }
};