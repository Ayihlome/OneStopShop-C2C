const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');
const { errorMeta, requestMeta, userMeta } = require('../utils/logging');

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    logger.warn('Authentication token missing', requestMeta(req));
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    req.user = jwt.verify(token, config.jwt.secret);
    return next();
  } catch (error) {
    logger.warn('Authentication token invalid', {
      ...requestMeta(req),
      ...errorMeta(error),
    });
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn('Authorization role check failed', {
        ...requestMeta(req),
        ...userMeta(req.user),
        requiredRoles: roles,
      });
      return res.status(403).json({ error: 'Forbidden' });
    }

    return next();
  };
}

const isMod = [authenticate, requireRole('moderator', 'superadmin')];
const isSuperAdmin = [authenticate, requireRole('superadmin')];

module.exports = {
  authenticate,
  requireRole,
  isMod,
  isSuperAdmin,
};
