import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Akshay Tiwari | Full Stack & AI Engineer',
  description: 'Premium AI-first developer portfolio for Akshay Tiwari.',
  keywords: ['Akshay Tiwari', 'Full Stack Developer', 'AI Engineer', 'Next.js', 'Portfolio'],
  openGraph: {
    title: 'Akshay Tiwari | Full Stack & AI Engineer',
    description: 'Premium AI-first developer portfolio for Akshay Tiwari.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
