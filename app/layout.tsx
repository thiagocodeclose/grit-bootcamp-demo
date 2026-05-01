// @ts-nocheck
import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { getKorivaConfig, buildCssVars } from '@/lib/koriva-config';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
});
const sourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-source-sans' });

export const metadata: Metadata = {
  title: 'GRIT Bootcamp — Military-Style Training · Nashville, TN',
  description: 'Nashville\'s toughest bootcamp. Military-style training, team accountability, and real results. Indoor and outdoor, six days a week.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getKorivaConfig();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`} style={vars as React.CSSProperties}>
      <body>{children}</body>
    </html>
  );
}
