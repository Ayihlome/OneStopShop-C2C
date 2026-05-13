const pool = require('../db/pool');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// Strip sensitive fields before returning
const sanitize = (row) => {
  if (!row) return null;
  const { password_hash, ...safe } = row;
  return safe;
};

exports.list = async () => {
  const result = await pool.query(`
    SELECT a.* FROM accounts a
    INNER JOIN users u ON u.account_id = a.id
    ORDER BY a.created_at DESC
  `);
  return result.rows.map(sanitize);
};

exports.findById = async (id) => {
  const result = await pool.query(`
    SELECT a.* FROM accounts a
    INNER JOIN users u ON u.account_id = a.id
    WHERE a.id = $1
  `, [id]);
  return sanitize(result.rows[0]);
};

exports.findByEmail = async (email) => {
  const result = await pool.query(`
    SELECT a.* FROM accounts a
    INNER JOIN users u ON u.account_id = a.id
    WHERE a.email = $1
  `, [email]);
  return result.rows[0]; // raw — includes password_hash for auth comparison
};

exports.create = async ({ first_name, last_name, email, password, phone_number, city, town }) => {
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

    await client.query(
      'INSERT INTO users (account_id) VALUES ($1)',
      [account.id]
    );

    await client.query('COMMIT');
    return sanitize(account);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.update = async (id, { first_name, last_name, phone_number, city, town, profile_photo_url }) => {
  const result = await pool.query(`
    UPDATE accounts
    SET first_name = COALESCE($1, first_name),
        last_name  = COALESCE($2, last_name),
        phone_number = COALESCE($3, phone_number),
        city = COALESCE($4, city),
        town = COALESCE($5, town),
        profile_photo_url = COALESCE($6, profile_photo_url),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *
  `, [first_name, last_name, phone_number, city, town, profile_photo_url, id]);
  return sanitize(result.rows[0]);
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
};