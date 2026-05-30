import { redirect } from 'react-router';

const ADMIN_ROLES = ['admin', 'moderator', 'superadmin'];

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('oss_user') || '{}');
  } catch {
    return {};
  }
}

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
 * Loader that blocks non-admin access.
 * Must be used AFTER requireAuth (or on routes already behind requireAuth).
 */
export function requireAdmin() {
  const token = typeof window !== 'undefined' && localStorage.getItem('oss_token');

  if (!token) {
    throw redirect('/login');
  }

  const user = getStoredUser();
  if (!user.role || !ADMIN_ROLES.includes(user.role)) {
    throw redirect('/');
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

  const user = getStoredUser();

  // Admin goes to dashboard
  if (user.role && ADMIN_ROLES.includes(user.role)) {
    throw redirect('/admin/dashboard');
  }

  // Provider goes to their profile
  if (user.isProvider) {
    throw redirect('/mechanic/profile');
  }

  // Everyone else goes to find-mechanic
  throw redirect('/find-mechanic');
}
