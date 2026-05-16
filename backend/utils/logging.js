function errorMeta(error, options = {}) {
  const meta = {
    message: error.message,
  };

  if (error.code) {
    meta.code = error.code;
  }

  if (error.statusCode || error.status) {
    meta.statusCode = error.statusCode || error.status;
  }

  if (options.includeStack && error.stack) {
    meta.stack = error.stack;
  }

  return meta;
}

function requestMeta(req) {
  return {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  };
}

function userMeta(user) {
  if (!user) {
    return {};
  }

  return {
    userId: user.id,
    role: user.role,
  };
}

module.exports = {
  errorMeta,
  requestMeta,
  userMeta,
};
