const pool = require('../db/pool');
const userService = require('./userService');
const mechanicService = require('./mechanicService');
const paymentService = require('./paymentService');
const logger = require('../utils/logger');
const { errorMeta } = require('../utils/logging');
const { sanitize } = require('../utils/sanitize');
const { createError } = require('../utils/errors');

async function countOne(query, params = []) {
  const result = await pool.query(query, params);
  return Number(result.rows[0].count);
}

async function getDashboardStats() {
  const [
    totalUsers,
    totalMechanics,
    verifiedMechanics,
    totalBookings,
    totalReviews,
    totalVisits,
    visitsToday,
    visitsThisWeek,
    pendingVerifications,
    activeBookings,
    totalPayments,
    successfulPayments,
  ] = await Promise.all([
    countOne(`SELECT COUNT(*) FROM users`),
    countOne(`SELECT COUNT(*) FROM service_provider_profiles`),
    countOne(`SELECT COUNT(*) FROM service_provider_profiles WHERE verification_badge = true`),
    countOne(`SELECT COUNT(*) FROM bookings`),
    countOne(`SELECT COUNT(*) FROM reviews`),
    countOne(`SELECT COUNT(*) FROM page_visits`),
    countOne(`SELECT COUNT(*) FROM page_visits WHERE created_at >= CURRENT_DATE`),
    countOne(
      `SELECT COUNT(*)
       FROM page_visits
       WHERE created_at >= date_trunc('week', NOW())`
    ),
    countOne(`SELECT COUNT(*) FROM mechanic_documents WHERE status = 'pending'`),
    countOne(
      `SELECT COUNT(*)
       FROM bookings
       WHERE booking_status IN ('payment_pending', 'paid', 'whatsapp_redirected', 'in_progress')`
    ),
    countOne(`SELECT COUNT(*) FROM payments`),
    countOne(`SELECT COUNT(*) FROM payments WHERE payment_status = 'successful'`),
  ]);

  logger.debug('Admin dashboard stats loaded', {
    totalUsers,
    totalMechanics,
    activeBookings,
    pendingVerifications,
  });

  return {
    total_users: totalUsers,
    total_mechanics: totalMechanics,
    verified_mechanics: verifiedMechanics,
    total_bookings: totalBookings,
    total_reviews: totalReviews,
    total_visits: totalVisits,
    visits_today: visitsToday,
    visits_this_week: visitsThisWeek,
    pending_verifications: pendingVerifications,
    active_bookings: activeBookings,
    total_payments: totalPayments,
    successful_payments: successfulPayments,
  };
}

async function listPendingDocuments() {
  const result = await pool.query(
    `SELECT
       md.*,
       a.first_name,
       a.last_name,
       a.email
     FROM mechanic_documents md
     INNER JOIN service_provider_profiles sp ON sp.id = md.mechanic_id
     INNER JOIN accounts a ON a.id = sp.account_id
     WHERE md.status = 'pending'
     ORDER BY md.created_at ASC`
  );

  logger.debug('Pending mechanic documents listed', {
    count: result.rowCount,
  });

  return sanitize(result.rows);
}

async function approveDocument(id, adminId) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const documentResult = await client.query(
      `UPDATE mechanic_documents
       SET status = 'approved',
           reviewed_at = NOW(),
           reviewed_by = $2
       WHERE id = $1
       RETURNING *`,
      [id, adminId]
    );
    const document = documentResult.rows[0];

    if (!document) {
      logger.warn('Document approval failed because document was not found', {
        documentId: id,
        adminId,
      });
      throw createError(404, 'Document not found');
    }

    await client.query(
      `UPDATE service_provider_profiles
       SET verification_badge = true, verification_status = 'verified'
       WHERE id = $1`,
      [document.provider_id]
    );

    await client.query('COMMIT');
    logger.info('Mechanic document approved', {
      documentId: id,
      providerId: document.provider_id,
      adminId,
    });

    return sanitize(document);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Document approval rolled back', {
      ...errorMeta(error, { includeStack: true }),
      documentId: id,
      adminId,
    });
    throw error;
  } finally {
    client.release();
  }
}

async function rejectDocument(id, adminId) {
  const result = await pool.query(
    `UPDATE mechanic_documents
     SET status = 'rejected',
         reviewed_at = NOW(),
         reviewed_by = $2
     WHERE id = $1
     RETURNING *`,
    [id, adminId]
  );

  if (!result.rows[0]) {
    logger.warn('Document rejection failed because document was not found', {
      documentId: id,
      adminId,
    });
    throw createError(404, 'Document not found');
  }

  logger.info('Mechanic document rejected', {
    documentId: id,
    mechanicId: result.rows[0].mechanic_id,
    adminId,
  });

  return sanitize(result.rows[0]);
}

async function listUsers() {
  return userService.listUsers();
}

async function deleteUser(id) {
  const deleted = await userService.deleteUser(id);
  logger.info('User deleted by admin service', {
    userId: id,
  });
  return deleted;
}

async function listMechanics() {
  return mechanicService.listMechanics();
}

async function deleteMechanic(id) {
  const deleted = await mechanicService.deleteMechanic(id);
  logger.info('Mechanic deleted by admin service', {
    mechanicId: id,
  });
  return deleted;
}

async function verifyMechanic(id) {
  const verified = await mechanicService.verifyMechanic(id);
  logger.info('Mechanic verified by admin service', {
    mechanicId: id,
  });
  return verified;
}

async function suspendAccount(id) {
  const suspended = await userService.suspendAccount(id);
  logger.info('Account suspended by admin service', {
    accountId: id,
  });
  return suspended;
}

async function listPayments() {
  return paymentService.listAllPayments();
}

module.exports = {
  getDashboardStats,
  listUsers,
  deleteUser,
  listMechanics,
  deleteMechanic,
  verifyMechanic,
  suspendAccount,
  listPendingDocuments,
  approveDocument,
  rejectDocument,
  listPayments,
};
