const pool = require('../db/pool');
const logger = require('../utils/logger');
const { errorMeta } = require('../utils/logging');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

const PROVIDER_SELECT = `
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
    sp.id AS provider_profile_id,
    sp.business_name,
    sp.service_description,
    sp.years_of_experience,
    sp.is_available,
    sp.verification_badge,
    sp.verification_status,
    sp.provider_status,
    sp.lat,
    sp.lng,
    COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS average_rating,
    COUNT(DISTINCT r.id)::int AS review_count,
    sp.business_whatsapp_number,
    COALESCE(array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '{}') AS specialities,
    'provider' AS role
  FROM accounts a
  INNER JOIN service_provider_profiles sp ON sp.account_id = a.id
  LEFT JOIN reviews r ON r.service_provider_id = sp.id
  LEFT JOIN provider_specialities ps ON ps.provider_id = sp.id
  LEFT JOIN specialities s ON s.id = ps.speciality_id
`;

const PROVIDER_GROUP = `
  GROUP BY a.id, sp.id
`;

function withProviderMeta(record) {
  if (!record) return record;
  return {
    ...record,
    whatsapp_available: Boolean(record.business_whatsapp_number),
  };
}

function toNullable(value) {
  return value === undefined ? null : value;
}

async function listMechanics() {
  const result = await pool.query(
    `${PROVIDER_SELECT}
     WHERE a.status = 'active' AND sp.provider_status = 'active'
     ${PROVIDER_GROUP}
     ORDER BY sp.verification_badge DESC, average_rating DESC`
  );

  logger.debug('Mechanics listed', {
    count: result.rowCount,
  });

  return sanitize(result.rows.map(withProviderMeta));
}

async function getMechanic(accountId) {
  const result = await pool.query(
    `${PROVIDER_SELECT}
     WHERE a.id = $1
     ${PROVIDER_GROUP}`,
    [accountId]
  );

  if (!result.rows[0]) {
    logger.warn('Mechanic lookup failed because mechanic was not found', {
      mechanicId: accountId,
    });
    throw createError(404, 'Mechanic not found');
  }

  return sanitize(withProviderMeta(result.rows[0]));
}

async function getProfile(accountId) {
  return getMechanic(accountId);
}

async function searchMechanics(query) {
  const search = `%${query || ''}%`;
  const result = await pool.query(
    `${PROVIDER_SELECT}
     WHERE a.status = 'active'
       AND (
         a.first_name ILIKE $1
         OR a.last_name ILIKE $1
         OR a.city ILIKE $1
         OR a.town ILIKE $1
         OR sp.service_description ILIKE $1
         OR s.name ILIKE $1
       )
     ${PROVIDER_GROUP}
     ORDER BY sp.verification_badge DESC, average_rating DESC`,
    [search]
  );

  logger.debug('Mechanic search completed', {
    count: result.rowCount,
    hasQuery: Boolean(query),
  });

  return sanitize(result.rows.map(withProviderMeta));
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
    `${PROVIDER_SELECT}
     WHERE ${conditions.join(' AND ')}
     ${PROVIDER_GROUP}
     ORDER BY sp.verification_badge DESC, average_rating DESC`,
    values
  );

  logger.debug('Mechanic filter completed', {
    count: result.rowCount,
    filters: {
      hasCity: Boolean(filters.city),
      hasSpecialty: Boolean(filters.specialty),
    },
  });

  return sanitize(result.rows.map(withProviderMeta));
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
       sp.id AS provider_profile_id,
       sp.business_name,
       sp.service_description,
       sp.years_of_experience,
       sp.is_available,
       sp.verification_badge,
       sp.verification_status,
       sp.lat,
       sp.lng,
       COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS average_rating,
       COUNT(DISTINCT r.id)::int AS review_count,
       COALESCE(array_agg(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL), '{}') AS specialities,
       'provider' AS role,
       (POWER(sp.lat - $1, 2) + POWER(sp.lng - $2, 2)) AS distance_score
     FROM accounts a
     INNER JOIN service_provider_profiles sp ON sp.account_id = a.id
     LEFT JOIN reviews r ON r.service_provider_id = sp.id
     LEFT JOIN provider_specialities ps ON ps.provider_id = sp.id
     LEFT JOIN specialities s ON s.id = ps.speciality_id
     WHERE a.status = 'active'
       AND sp.lat IS NOT NULL
       AND sp.lng IS NOT NULL
     GROUP BY a.id, sp.id
     ORDER BY distance_score ASC
     LIMIT 25`,
    [lat, lng]
  );

  logger.debug('Nearby mechanics lookup completed', {
    count: result.rowCount,
    hasCoordinates: lat !== undefined && lng !== undefined,
  });

  return sanitize(result.rows.map(withProviderMeta));
}

async function syncSpecialities(client, providerId, specialities) {
  if (!Array.isArray(specialities)) {
    return;
  }

  await client.query(
    `DELETE FROM provider_specialities
     WHERE provider_id = $1`,
    [providerId]
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
      `INSERT INTO provider_specialities (provider_id, speciality_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [providerId, speciality.rows[0].id]
    );
  }
}

async function createProviderProfile(accountId, input) {
  const existing = await pool.query(
    `SELECT id FROM service_provider_profiles WHERE account_id = $1`,
    [accountId]
  );

  if (existing.rows[0]) {
    throw createError(409, 'Provider profile already exists for this account');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const profile = await client.query(
      `INSERT INTO service_provider_profiles (
         account_id, business_name, business_whatsapp_number, service_description,
         years_of_experience, payfast_merchant_id, payfast_merchant_key, lat, lng
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        accountId,
        toNullable(input.business_name),
        input.business_whatsapp_number,
        toNullable(input.service_description),
        toNullable(input.years_of_experience),
        toNullable(input.payfast_merchant_id),
        toNullable(input.payfast_merchant_key),
        toNullable(input.lat),
        toNullable(input.lng),
      ]
    );

    const newProfile = profile.rows[0];

    await syncSpecialities(client, newProfile.id, input.specialities);

    if (Array.isArray(input.availability) && input.availability.length > 0) {
      for (const slot of input.availability) {
        await client.query(
          `INSERT INTO mechanic_availability (provider_id, day_of_week, start_time, end_time)
           VALUES ($1, $2, $3, $4)`,
          [newProfile.id, slot.day_of_week, slot.start_time, slot.end_time]
        );
      }
    }

    await client.query('COMMIT');

    logger.info('Provider profile created', {
      accountId,
      profileId: newProfile.id,
    });

    return getMechanic(accountId);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Provider profile creation rolled back', {
      ...errorMeta(error, { includeStack: true }),
      accountId,
    });
    throw error;
  } finally {
    client.release();
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
         AND EXISTS (SELECT 1 FROM service_provider_profiles WHERE account_id = accounts.id)`,
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

    const providerUpdate = await client.query(
      `UPDATE service_provider_profiles
       SET business_name = COALESCE($2, business_name),
           business_whatsapp_number = COALESCE($3, business_whatsapp_number),
           service_description = COALESCE($4, service_description),
           years_of_experience = COALESCE($5, years_of_experience),
           is_available = COALESCE($6, is_available),
           lat = COALESCE($7, lat),
           lng = COALESCE($8, lng)
       WHERE account_id = $1
       RETURNING *`,
      [
        accountId,
        toNullable(input.business_name),
        toNullable(input.business_whatsapp_number),
        toNullable(input.service_description),
        toNullable(input.years_of_experience),
        toNullable(input.is_available),
        toNullable(input.lat),
        toNullable(input.lng),
      ]
    );

    if (!providerUpdate.rows[0]) {
      logger.warn('Mechanic update failed because mechanic was not found', {
        mechanicId: accountId,
      });
      throw createError(404, 'Mechanic not found');
    }

    const providerProfile = providerUpdate.rows[0];
    await syncSpecialities(client, providerProfile.id, input.specialities);
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

  // Look up the provider profile id from the account id
  const profileResult = await pool.query(
    `SELECT id FROM service_provider_profiles WHERE account_id = $1`,
    [mechanicId]
  );

  if (!profileResult.rows[0]) {
    throw createError(404, 'Provider profile not found');
  }

  const providerId = profileResult.rows[0].id;

  const result = await pool.query(
    `INSERT INTO mechanic_documents (provider_id, doc_type, file_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [providerId, docType, `/uploads/documents/${file.filename}`]
  );

  logger.info('Mechanic document uploaded', {
    mechanicId,
    providerId,
    documentId: result.rows[0].id,
    docType,
  });

  return sanitize(result.rows[0]);
}

async function deleteMechanic(accountId) {
  const result = await pool.query(
    `DELETE FROM accounts
     WHERE id = $1
       AND EXISTS (SELECT 1 FROM service_provider_profiles WHERE account_id = accounts.id)
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
    `UPDATE service_provider_profiles
     SET verification_badge = true, verification_status = 'verified'
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
  createProviderProfile,
};
