import client from './client';

export async function getNotifications() {
  return client.get('/notifications');
}

export async function markRead(id) {
  return client.patch(`/notifications/${id}/read`);
}
