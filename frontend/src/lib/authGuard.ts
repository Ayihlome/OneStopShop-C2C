import { redirect } from 'react-router';

/**
 * Loader that blocks unauthenticated access.
 * Redirects to /login?redirect=<return_path> if no token is found.
 */
export function requireAuth() {
  const token = typeof window !== 'undefined' && localStorage.getItem('oss_token');

  if (!token) {
    const currentPath = typeof window !== 'undefined'
      ? window.location.pathname + window.location.search
      : '/';
    throw redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }

  return null;
}

/**
 * Loader that redirects already-authenticated users away from
 * login/signup pages to a more useful destination.
 */
export function redirectIfAuth() {
  const token = typeof window !== 'undefined' && localStorage.getItem('oss_token');

  if (!token) {
    return null;
  }

  // Check what kind of user they are for a smarter redirect
  try {
    const user = JSON.parse(localStorage.getItem('oss_user') || '{}');
    if (user.isProvider) {
      throw redirect('/mechanic/profile');
    }
    // Admin can go to admin dashboard
    if (user.role === 'admin') {
      throw redirect('/admin/dashboard');
    }
  } catch {
    // If we can't parse the user, just redirect to find-mechanic
  }

  throw redirect('/find-mechanic');
}
