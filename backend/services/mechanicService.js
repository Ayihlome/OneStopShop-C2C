const pool = require('../db/pool');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const sanitize = (row) => {
  if (!row) return null;
  const { password_hash, ...safe } = row;
  return safe;
};

exports.list = async () => {
  const result = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge,
           ROUND(AVG(r.rating), 2) AS avg_rating,
           COUNT(r.id) AS review_count
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    LEFT JOIN reviews r ON r.mechanic_id = a.id
    GROUP BY a.id, m.account_id
    ORDER BY a.created_at DESC
  `);
  return result.rows.map(sanitize);
};

exports.findById = async (id) => {
  const result = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    WHERE a.id = $1
  `, [id]);
  return sanitize(result.rows[0]);
};

exports.findByEmail = async (email) => {
  const result = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    WHERE a.email = $1
  `, [email]);
  return result.rows[0]; // raw for auth
};

exports.create = async ({ first_name, last_name, email, password, phone_number, city, town, bio, years_experience }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const accountResult = await client.query(`
      INSERT INTO accounts (first_name, last_name, email, password_hash, phone_number, city, town)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [first_name, last_name, email, password_hash, phone_number, city, town]);

    const account = accountResult.rows[0];

    await client.query(`
      INSERT INTO mechanics (account_id, bio, years_experience)
      VALUES ($1, $2, $3)
    `, [account.id, bio || null, years_experience || null]);

    await client.query('COMMIT');
    return sanitize(account);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.update = async (id, { first_name, last_name, phone_number, city, town, bio, years_experience, is_available }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const accountResult = await client.query(`
      UPDATE accounts
      SET first_name = COALESCE($1, first_name),
          last_name  = COALESCE($2, last_name),
          phone_number = COALESCE($3, phone_number),
          city = COALESCE($4, city),
          town = COALESCE($5, town),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `, [first_name, last_name, phone_number, city, town, id]);

    await client.query(`
      UPDATE mechanics
      SET bio = COALESCE($1, bio),
          years_experience = COALESCE($2, years_experience),
          is_available = COALESCE($3, is_available)
      WHERE account_id = $4
    `, [bio, years_experience, is_available, id]);

    await client.query('COMMIT');
    return sanitize(accountResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
};

exports.search = async (query) => {
  const result = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    WHERE a.first_name ILIKE $1
       OR a.last_name  ILIKE $1
       OR a.city       ILIKE $1
  `, [`%${query}%`]);
  return result.rows.map(sanitize);
};

exports.filter = async ({ specialty, city }) => {
  const conditions = ['1=1'];
  const values = [];
  let i = 1;

  if (city) {
    conditions.push(`a.city ILIKE $${i++}`);
    values.push(`%${city}%`);
  }
  if (specialty) {
    conditions.push(`EXISTS (
      SELECT 1 FROM mechanic_specialities ms
      INNER JOIN specialities s ON s.id = ms.speciality_id
      WHERE ms.mechanic_id = a.id AND s.name ILIKE $${i++}
    )`);
    values.push(`%${specialty}%`);
  }

  const result = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    WHERE ${conditions.join(' AND ')}
  `, values);
  return result.rows.map(sanitize);
};

exports.findNearby = async (lat, lng) => {
  // TODO: implement with PostGIS (ST_DWithin) once postgis extension is enabled
  // For now returns all available mechanics
  const result = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    WHERE m.is_available = true
  `);
  return result.rows.map(sanitize);
};

exports.getProfile = async (id) => {
  const mechResult = await pool.query(`
    SELECT a.*, m.bio, m.years_experience, m.is_available, m.verification_badge,
           ROUND(AVG(r.rating), 2) AS avg_rating,
           COUNT(r.id) AS review_count
    FROM accounts a
    INNER JOIN mechanics m ON m.account_id = a.id
    LEFT JOIN reviews r ON r.mechanic_id = a.id
    WHERE a.id = $1
    GROUP BY a.id, m.account_id
  `, [id]);

  const mechanic = sanitize(mechResult.rows[0]);
  if (!mechanic) return null;

  const specialitiesResult = await pool.query(`
    SELECT s.name FROM specialities s
    INNER JOIN mechanic_specialities ms ON ms.speciality_id = s.id
    WHERE ms.mechanic_id = $1
  `, [id]);

  const availabilityResult = await pool.query(`
    SELECT day_of_week, start_time, end_time
    FROM mechanic_availability
    WHERE mechanic_id = $1
    ORDER BY day_of_week
  `, [id]);

  return {
    ...mechanic,
    specialities: specialitiesResult.rows.map(r => r.name),
    availability: availabilityResult.rows,
  };
};