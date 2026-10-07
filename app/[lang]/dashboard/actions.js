'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { dashboardCookieName, dashboardToken, passwordsMatch } from '@/lib/dashboard-auth';

export async function unlockDashboard(lang, _prev, formData) {
  const expected = process.env.DASHBOARD_PASSWORD || '';
  const password = String(formData.get('password') || '');
  if (!expected || !passwordsMatch(password, expected)) {
    return { error: 'That password is not right.' };
  }
  const jar = await cookies();
  jar.set(dashboardCookieName(), dashboardToken(expected), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect(`/${lang}/dashboard`);
}
