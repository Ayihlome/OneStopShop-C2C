export { default as apiClient } from './client';
export * from './auth';
export * from './bookings';
export * from './mechanics';
export * from './notifications';
export * from './reviews';
export * from './vehicles';
export * as adminApi from './admin';
export {
  approveDocument,
  deleteMechanic,
  deleteReport,
  deleteUser,
  getDashboard,
  listMechanics as listAdminMechanics,
  listPendingDocuments,
  listReports,
  listUsers,
  rejectDocument,
  suspendAccount,
  verifyMechanic,
} from './admin';
