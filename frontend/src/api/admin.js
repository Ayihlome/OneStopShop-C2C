import client from './client';

export async function getDashboard() {
  return client.get('/admin/dashboard');
}

export async function listUsers() {
  return client.get('/admin/users');
}

export async function deleteUser(id) {
  return client.delete(`/admin/users/${id}`);
}

export async function listMechanics() {
  return client.get('/admin/mechanics');
}

export async function deleteMechanic(id) {
  return client.delete(`/admin/mechanics/${id}`);
}

export async function verifyMechanic(id) {
  return client.patch(`/admin/mechanics/${id}/verify`);
}

export async function suspendAccount(id) {
  return client.patch(`/admin/accounts/${id}/suspend`);
}

export async function listPendingDocuments() {
  return client.get('/admin/documents');
}

export async function getDocument(id) {
  return client.get(`/admin/documents/${id}`);
}

export async function approveDocument(id) {
  return client.patch(`/admin/documents/${id}/approve`);
}

export async function rejectDocument(id) {
  return client.patch(`/admin/documents/${id}/reject`);
}

export async function listReports() {
  return client.get('/admin/reports');
}

export async function deleteReport(id) {
  return client.delete(`/admin/reports/${id}`);
}

export async function listPayments() {
  return client.get('/admin/payments');
}
