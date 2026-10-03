'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '/#projects' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-900/[0.08] bg-white/80 px-4 py-3 text-slate-900 shadow-[0_12px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl sm:px-5">
        <a href="/#home" className="flex min-w-0 flex-col" aria-label="VEZIXA LABS home">
          <img
            src="/projects/logo1.png"
             alt="VEZIXA LABS"
               className="h-14 w-auto object-contain"
           />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm font-medium text-slate-600 transition-colors hover:text-violet-800">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="/#contact" className="hidden rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800 sm:inline-flex">
            Start a Project
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex w-full flex-col border-t border-slate-200 pt-2 lg:hidden">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-800"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}