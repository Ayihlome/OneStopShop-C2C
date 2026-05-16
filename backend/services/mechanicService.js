const pool = require('../db/pool');
const logger = require('../utils/logger');
const { errorMeta } = require('../utils/logging');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

const MECHANIC_SELECT = `
  SELECT
    a.id,
    a.first_name,
    a.last_name,
    a.email,
    a.phone_number,
    a.city,
    a.town,
    a.profile_photo_url,
    a.status,
    a.created_at,
    a.updated_at,
    m.id AS mechanic_profile_id,
    m.bio,
    m.years_experience,
    m.is_available,
    m.verification_badge,
    m.whatsapp_number,
    m.lat,
    m.lng,
    COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS average_rating,
    COUNT(DISTINCT r.id)::int AS review_count,
    COALESCE(array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '{}') AS specialities,
    'mechanic' AS role
  FROM accounts a
  INNER JOIN mechanics m ON m.account_id = a.id
  LEFT JOIN reviews r ON r.mechanic_id = a.id
  LEFT JOIN mechanic_specialities ms ON ms.mechanic_id = a.id
  LEFT JOIN specialities s ON s.id = ms.speciality_id
`;

const MECHANIC_GROUP = `
  GROUP BY
    a.id, m.id
`;

function withWhatsappUrl(record) {
  if (!record) {
    return record;
  }

  return {
    ...record,
    whatsapp_url: record.whatsapp_number
      ? `https://wa.me/${String(record.whatsapp_number).replace(/\D/g, '')}`
      : null,
  };
}

function toNullable(value) {
  return value === undefined ? null : value;
}

async function listMechanics() {
  const result = await pool.query(
    `${MECHANIC_SELECT}
     WHERE a.status = 'active'
     ${MECHANIC_GROUP}
     ORDER BY m.verification_badge DESC, a.created_at DESC`
  );

  logger.debug('Mechanics listed', {
    count: result.rowCount,
  });

  return sanitize(result.rows.map(withWhatsappUrl));
}

async function getMechanic(accountId) {
  const result = await pool.query(
    `${MECHANIC_SELECT}
     WHERE a.id = $1
     ${MECHANIC_GROUP}`,
    [accountId]
  );

  if (!result.rows[0]) {
    logger.warn('Mechanic lookup failed because mechanic was not found', {
      mechanicId: accountId,
    });
    throw createError(404, 'Mechanic not found');
  }

  return sanitize(withWhatsappUrl(result.rows[0]));
}

async function getProfile(accountId) {
  return getMechanic(accountId);
}

async function searchMechanics(query) {
  const search = `%${query || ''}%`;
  const result = await pool.query(
    `${MECHANIC_SELECT}
     WHERE a.status = 'active'
       AND (
         a.first_name ILIKE $1
         OR a.last_name ILIKE $1
         OR a.city ILIKE $1
         OR a.town ILIKE $1
         OR m.bio ILIKE $1
         OR s.name ILIKE $1
       )
     ${MECHANIC_GROUP}
     ORDER BY m.verification_badge DESC, average_rating DESC`,
    [search]
  );

  logger.debug('Mechanic search completed', {
    count: result.rowCount,
    hasQuery: Boolean(query),
  });

  return sanitize(result.rows.map(withWhatsappUrl));
}

async function filterMechanics(filters) {
  const values = [];
  const conditions = ["a.status = 'active'"];

  if (filters.city) {
    values.push(filters.city);
    conditions.push(`a.city ILIKE '%' || $${values.length} || '%'`);
  }

  if (filters.specialty) {
    values.push(filters.specialty);
    conditions.push(`s.name ILIKE '%' || $${values.length} || '%'`);
  }

  const result = await pool.query(
    `${MECHANIC_SELECT}
     WHERE ${conditions.join(' AND ')}
     ${MECHANIC_GROUP}
     ORDER BY m.verification_badge DESC, average_rating DESC`,
    values
  );

  logger.debug('Mechanic filter completed', {
    count: result.rowCount,
    filters: {
      hasCity: Boolean(filters.city),
      hasSpecialty: Boolean(filters.specialty),
    },
  });

  return sanitize(result.rows.map(withWhatsappUrl));
}

async function findNearby(lat, lng) {
  const result = await pool.query(
    `SELECT
       a.id,
       a.first_name,
       a.last_name,
       a.email,
       a.phone_number,
       a.city,
       a.town,
       a.profile_photo_url,
       a.status,
       a.created_at,
       a.updated_at,
       m.id AS mechanic_profile_id,
       m.bio,
       m.years_experience,
       m.is_available,
       m.verification_badge,
       m.whatsapp_number,
       m.lat,
       m.lng,
       COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS average_rating,
       COUNT(DISTINCT r.id)::int AS review_count,
       COALESCE(array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '{}') AS specialities,
       'mechanic' AS role,
       (POWER(m.lat - $1, 2) + POWER(m.lng - $2, 2)) AS distance_score
     FROM accounts a
     INNER JOIN mechanics m ON m.account_id = a.id
     LEFT JOIN reviews r ON r.mechanic_id = a.id
     LEFT JOIN mechanic_specialities ms ON ms.mechanic_id = a.id
     LEFT JOIN specialities s ON s.id = ms.speciality_id
     WHERE a.status = 'active'
       AND m.lat IS NOT NULL
       AND m.lng IS NOT NULL
     GROUP BY a.id, m.id
     ORDER BY distance_score ASC
     LIMIT 25`,
    [lat, lng]
  );

  logger.debug('Nearby mechanics lookup completed', {
    count: result.rowCount,
    hasCoordinates: lat !== undefined && lng !== undefined,
  });

  return sanitize(result.rows.map(withWhatsappUrl));
}

async function syncSpecialities(client, mechanicAccountId, specialities) {
  if (!Array.isArray(specialities)) {
    return;
  }

  await client.query(
    `DELETE FROM mechanic_specialities
     WHERE mechanic_id = $1`,
    [mechanicAccountId]
  );

  for (const rawName of specialities) {
    const name = String(rawName || '').trim();

    if (!name) {
      continue;
    }

    const speciality = await client.query(
      `INSERT INTO specialities (name)
       VALUES ($1)
       ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [name]
    );

    await client.query(
      `INSERT INTO mechanic_specialities (mechanic_id, speciality_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [mechanicAccountId, speciality.rows[0].id]
    );
  }
}

async function update(accountId, input) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `UPDATE accounts
       SET first_name = COALESCE($2, first_name),
           last_name = COALESCE($3, last_name),
           phone_number = COALESCE($4, phone_number),
           city = COALESCE($5, city),
           town = COALESCE($6, town),
           profile_photo_url = COALESCE($7, profile_photo_url)
       WHERE id = $1
         AND EXISTS (SELECT 1 FROM mechanics WHERE account_id = accounts.id)`,
      [
        accountId,
        toNullable(input.first_name),
        toNullable(input.last_name),
        toNullable(input.phone_number),
        toNullable(input.city),
        toNullable(input.town),
        toNullable(input.profile_photo_url),
      ]
    );

    const mechanicUpdate = await client.query(
      `UPDATE mechanics
       SET bio = COALESCE($2, bio),
           years_experience = COALESCE($3, years_experience),
           is_available = COALESCE($4, is_available),
           whatsapp_number = COALESCE($5, whatsapp_number),
           lat = COALESCE($6, lat),
           lng = COALESCE($7, lng)
       WHERE account_id = $1
       RETURNING *`,
      [
        accountId,
        toNullable(input.bio),
        toNullable(input.years_experience),
        toNullable(input.is_available),
        toNullable(input.whatsapp_number),
        toNullable(input.lat),
        toNullable(input.lng),
      ]
    );

    if (!mechanicUpdate.rows[0]) {
      logger.warn('Mechanic update failed because mechanic was not found', {
        mechanicId: accountId,
      });
      throw createError(404, 'Mechanic not found');
    }

    await syncSpecialities(client, accountId, input.specialities);
    await client.query('COMMIT');

    logger.info('Mechanic profile updated', {
      mechanicId: accountId,
      updatedFields: Object.keys(input).filter((key) => input[key] !== undefined),
    });

    return getMechanic(accountId);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Mechanic update rolled back', {
      ...errorMeta(error, { includeStack: true }),
      mechanicId: accountId,
    });
    throw error;
  } finally {
    client.release();
  }
}

async function uploadDocument(mechanicId, docType, file) {
  if (!file) {
    logger.warn('Document upload rejected because file is missing', {
      mechanicId,
      docType,
    });
    throw createError(400, 'Document file is required');
  }

  const result = await pool.query(
    `INSERT INTO mechanic_documents (mechanic_id, doc_type, file_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [mechanicId, docType, `/uploads/documents/${file.filename}`]
  );

  logger.info('Mechanic document uploaded', {
    mechanicId,
    documentId: result.rows[0].id,
    docType,
  });

  return sanitize(result.rows[0]);
}

async function deleteMechanic(accountId) {
  const result = await pool.query(
    `DELETE FROM accounts
     WHERE id = $1
       AND EXISTS (SELECT 1 FROM mechanics WHERE account_id = accounts.id)
     RETURNING *`,
    [accountId]
  );

  if (!result.rows[0]) {
    logger.warn('Mechanic deletion failed because mechanic was not found', {
      mechanicId: accountId,
    });
    throw createError(404, 'Mechanic not found');
  }

  logger.info('Mechanic account deleted', {
    mechanicId: accountId,
  });

  return sanitize(result.rows[0]);
}

async function verifyMechanic(accountId) {
  const result = await pool.query(
    `UPDATE mechanics
     SET verification_badge = true
     WHERE account_id = $1
     RETURNING *`,
    [accountId]
  );

  if (!result.rows[0]) {
    logger.warn('Mechanic verification failed because mechanic was not found', {
      mechanicId: accountId,
    });
    throw createError(404, 'Mechanic not found');
  }

  logger.info('Mechanic verified', {
    mechanicId: accountId,
  });

  return getMechanic(accountId);
}

module.exports = {
  listMechanics,
  getMechanic,
  getProfile,
  searchMechanics,
  filterMechanics,
  findNearby,
  update,
  uploadDocument,
  deleteMechanic,
  verifyMechanic,
};
