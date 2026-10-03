'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';
import { SiteHeader } from '@/components/site-header';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <SiteHeader />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}