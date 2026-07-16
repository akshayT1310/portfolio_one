'use client';

import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/akshay-tiwari3511/',
    label: 'LinkedIn',
    icon: Linkedin
  },
  {
    href: 'https://github.com/akshayT1310',
    label: 'GitHub',
    icon: Github
  },
  {
    href: 'https://www.instagram.com/social_aksht_/',
    label: 'Instagram',
    icon: Instagram
  }
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="border-t border-white/10 bg-[#050816]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="max-w-xl">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Portfolio</p>
            <h2 className="text-2xl font-semibold text-white">Akshay Tiwari</h2>
            <p className="mt-2 text-lg font-medium text-slate-300">Full Stack Developer</p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              Building scalable web applications with modern technologies and creating impactful digital experiences.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-cyan-400" />
                <a href="mailto:takshaymain13@gmail.com" className="transition hover:text-cyan-300">
                  takshaymain13@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-cyan-400" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Social</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <Icon size={18} className="transition duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Akshay Tiwari. All Rights Reserved.</p>
            <p className="text-slate-400">Designed &amp; Developed by Akshay Tiwari</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
