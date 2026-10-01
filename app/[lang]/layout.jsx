import { notFound } from 'next/navigation';
import { Anton, Instrument_Serif, DM_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { locales, dir, getDictionary, hasLocale } from '@/lib/i18n';
import '../globals.css';

const display = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });
const sans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-dm-sans', display: 'swap' });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['300', '400', '500', '600', '700'], variable: '--font-arabic', display: 'swap' });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://phoenixtechs.com'),
    title: meta.title,
    description: meta.description,
    icons: { icon: '/favicon.svg' },
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
    openGraph: { title: meta.title, description: meta.description, images: ['/logo-crimson.svg'], locale: lang },
  };
}

export const viewport = { themeColor: '#07060a' };

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} dir={dir(lang)} className={`${display.variable} ${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
