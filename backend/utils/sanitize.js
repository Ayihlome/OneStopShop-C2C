const SENSITIVE_KEYS = new Set(['password_hash']);

function sanitizeRecord(record) {
  if (!record || typeof record !== 'object') {
    return record;
  }

  if (Array.isArray(record)) {
    return record.map(sanitizeRecord);
  }

  return Object.entries(record).reduce((clean, [key, value]) => {
    if (!SENSITIVE_KEYS.has(key)) {
      clean[key] = value;
    }
    return clean;
  }, {});
}

module.exports = {
  sanitize: sanitizeRecord,
};
