const pool = require('../db/pool');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

async function listUsers() {
  const result = await pool.query(
    `SELECT a.*, u.id AS user_profile_id, 'user' AS role
     FROM accounts a
     INNER JOIN users u ON u.account_id = a.id
     WHERE a.status <> 'deleted'
     ORDER BY a.created_at DESC`
  );

  return sanitize(result.rows);
}

async function getUser(accountId) {
  const result = await pool.query(
    `SELECT a.*, u.id AS user_profile_id, 'user' AS role
     FROM accounts a
     INNER JOIN users u ON u.account_id = a.id
     WHERE a.id = $1`,
    [accountId]
  );

  if (!result.rows[0]) {
    throw createError(404, 'User not found');
  }

  return sanitize(result.rows[0]);
}

async function updateUser(accountId, input) {
  const result = await pool.query(
    `UPDATE accounts
     SET first_name = COALESCE($2, first_name),
         last_name = COALESCE($3, last_name),
         phone_number = COALESCE($4, phone_number),
         city = COALESCE($5, city),
         town = COALESCE($6, town),
         profile_photo_url = COALESCE($7, profile_photo_url)
     WHERE id = $1
       AND EXISTS (SELECT 1 FROM users WHERE account_id = accounts.id)
     RETURNING *, 'user' AS role`,
    [
      accountId,
      input.first_name ?? null,
      input.last_name ?? null,
      input.phone_number ?? null,
      input.city ?? null,
      input.town ?? null,
      input.profile_photo_url ?? null,
    ]
  );

  if (!result.rows[0]) {
    throw createError(404, 'User not found');
  }

  return sanitize(result.rows[0]);
}

async function deleteUser(accountId) {
  const result = await pool.query(
    `DELETE FROM accounts
     WHERE id = $1
       AND EXISTS (SELECT 1 FROM users WHERE account_id = accounts.id)
     RETURNING *`,
    [accountId]
  );

  if (!result.rows[0]) {
    throw createError(404, 'User not found');
  }

  return sanitize(result.rows[0]);
}

async function suspendAccount(accountId) {
  const result = await pool.query(
    `UPDATE accounts
     SET status = 'suspended'
     WHERE id = $1
     RETURNING *`,
    [accountId]
  );

  if (!result.rows[0]) {
    throw createError(404, 'Account not found');
  }

  return sanitize(result.rows[0]);
}

module.exports = {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  suspendAccount,
};
