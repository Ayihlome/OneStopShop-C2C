const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const config = require('../config');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

const BCRYPT_ROUNDS = 12;

function signToken(user) {
  return jwt.sign(
    {
      id: Number(user.id),
      email: user.email,
      role: user.role,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
}

function toNullable(value) {
  return value === undefined ? null : value;
}

async function createAccount(client, input) {
  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
  const result = await client.query(
    `INSERT INTO accounts (
       first_name, last_name, email, password_hash, phone_number,
       city, town, profile_photo_url
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      input.first_name,
      input.last_name,
      input.email,
      passwordHash,
      toNullable(input.phone_number),
      toNullable(input.city),
      toNullable(input.town),
      toNullable(input.profile_photo_url),
    ]
  );

  return result.rows[0];
}

function handleUniqueEmail(error) {
  if (error.code === '23505') {
    throw createError(409, 'An account with this email already exists');
  }

  throw error;
}

async function signupUser(input) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const account = await createAccount(client, input);

    await client.query(
      `INSERT INTO users (account_id)
       VALUES ($1)`,
      [account.id]
    );

    await client.query('COMMIT');

    const user = sanitize({ ...account, role: 'user' });
    return {
      user,
      token: signToken(user),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    handleUniqueEmail(error);
  } finally {
    client.release();
  }
}

async function signupMechanic(input) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const account = await createAccount(client, input);

    await client.query(
      `INSERT INTO mechanics (
         account_id, bio, years_experience, whatsapp_number, lat, lng
       )
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        account.id,
        toNullable(input.bio),
        toNullable(input.years_experience),
        toNullable(input.whatsapp_number),
        toNullable(input.lat),
        toNullable(input.lng),
      ]
    );

    await client.query('COMMIT');

    const mechanic = sanitize({ ...account, role: 'mechanic' });
    return {
      user: mechanic,
      token: signToken(mechanic),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    handleUniqueEmail(error);
  } finally {
    client.release();
  }
}

async function findAccountByEmail(email) {
  const result = await pool.query(
    `SELECT
       a.*,
       CASE
         WHEN u.account_id IS NOT NULL THEN 'user'
         WHEN m.account_id IS NOT NULL THEN 'mechanic'
         ELSE NULL
       END AS role
     FROM accounts a
     LEFT JOIN users u ON u.account_id = a.id
     LEFT JOIN mechanics m ON m.account_id = a.id
     WHERE a.email = $1`,
    [email]
  );

  return result.rows[0] || null;
}

async function loginAccount(email, password, expectedRole) {
  const account = await findAccountByEmail(email);

  if (!account || account.role !== expectedRole) {
    throw createError(401, 'Invalid email or password');
  }

  if (account.status !== 'active') {
    throw createError(403, 'Account is not active');
  }

  const isPasswordValid = await bcrypt.compare(password, account.password_hash);

  if (!isPasswordValid) {
    throw createError(401, 'Invalid email or password');
  }

  const user = sanitize(account);
  return {
    user,
    token: signToken(user),
  };
}

async function loginAdmin(email, password) {
  const result = await pool.query(
    `SELECT *
     FROM admins
     WHERE email = $1`,
    [email]
  );
  const admin = result.rows[0];

  if (!admin) {
    throw createError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

  if (!isPasswordValid) {
    throw createError(401, 'Invalid email or password');
  }

  const user = sanitize(admin);
  return {
    user,
    token: signToken(user),
  };
}

module.exports = {
  signupUser,
  signupMechanic,
  loginAccount,
  loginAdmin,
};
