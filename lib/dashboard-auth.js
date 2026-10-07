import { createHash, timingSafeEqual } from 'node:crypto';

const COOKIE = 'dashboard_auth';

export function dashboardCookieName() {
  return COOKIE;
}

export function dashboardToken(password) {
  return createHash('sha256').update(`phoenixtechs-dashboard:${password}`).digest('hex');
}

export function passwordsMatch(input, expected) {
  const a = createHash('sha256').update(String(input)).digest();
  const b = createHash('sha256').update(String(expected)).digest();
  return timingSafeEqual(a, b);
}

export function isDashboardAuthed(cookieValue, password) {
  if (!password || !cookieValue) return false;
  const expected = dashboardToken(password);
  const a = Buffer.from(String(cookieValue));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
