import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

// Send visitors without a locale prefix to /en or /ar based on their browser language.
function preferredLocale(request) {
  const header = request.headers.get('accept-language') || '';
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => locales.includes(r.lang))?.lang ?? defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // skip Next internals, the API and static files
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
