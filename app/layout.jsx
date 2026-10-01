import { Anton, Instrument_Serif, DM_Sans } from 'next/font/google';
import './globals.css';

const display = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument', display: 'swap' });
const sans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-dm-sans', display: 'swap' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://phoenixtechs.com'),
  title: 'PhoenixTechs: Software that grows your business',
  description:
    'PhoenixTechs designs and builds web platforms, mobile apps and AI products that launch in weeks and grow revenue. Book a free consultation.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'PhoenixTechs: Software that grows your business',
    description: 'Web platforms, mobile apps and AI products, launched in weeks, built to scale.',
    images: ['/logo-crimson.svg'],
  },
};

export const viewport = { themeColor: '#07060a' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
