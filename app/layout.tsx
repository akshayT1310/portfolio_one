import './globals.css';
import type { Metadata } from 'next';
import { Caveat, Manrope, Space_Grotesk } from 'next/font/google';
import { SiteChrome } from '@/components/site-chrome';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  title: 'VEZIXA LABS | Software, AI & Digital Products',
  description: 'VEZIXA LABS builds modern software, AI solutions and digital products for businesses looking to create better digital experiences.',
  openGraph: {
    title: 'VEZIXA LABS | Software, AI & Digital Products',
    description: 'VEZIXA LABS builds modern software, AI solutions and digital products for businesses looking to create better digital experiences.',
    type: 'website',
    siteName: 'VEZIXA LABS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VEZIXA LABS | Software, AI & Digital Products',
    description: 'Modern software, AI solutions and digital products for better digital experiences.',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} ${caveat.variable}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
