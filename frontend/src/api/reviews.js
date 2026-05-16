import client from './client';

export async function createReview(data) {
  return client.post('/reviews', data);
}

export async function getMechanicReviews(id) {
  return client.get(`/reviews/mechanic/${id}`);
}

export async function getMyReviews() {
  return client.get('/reviews/user');
}
