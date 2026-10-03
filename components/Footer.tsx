'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin, MapPin, Phone } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/akshay-tiwari3511/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/__aakshatt_/',
    label: 'Instagram',
    icon: Instagram,
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative border-t border-slate-200 bg-white/70"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:px-10">

        {/* ================= TOP FOOTER ================= */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr]">

          {/* Brand */}
          <div className="max-w-xl">
            <img
              src="/projects/logo1.png"
              alt="VEZIXA LABS"
              className="h-16 w-auto object-contain"
            />

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Thoughtful engineering, intelligent software, and refined digital
              products for businesses building what&apos;s next.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Explore
            </h3>

            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-600">
              <li>
                <a
                  href="/projects"
                  className="transition hover:text-violet-800"
                >
                  Work
                </a>
              </li>

              <li>
                <a
                  href="/#services"
                  className="transition hover:text-violet-800"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="/#about"
                  className="transition hover:text-violet-800"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/#process"
                  className="transition hover:text-violet-800"
                >
                  Process
                </a>
              </li>

              <li>
                <a
                  href="/#faq"
                  className="transition hover:text-violet-800"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="/#contact"
                  className="transition hover:text-violet-800"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Services
            </h3>

            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-600">
              <li>
                <a
                  href="/services/web-development"
                  className="transition hover:text-violet-800"
                >
                  Web Development
                </a>
              </li>

              <li>
                <a
                  href="/services/ai-solutions"
                  className="transition hover:text-violet-800"
                >
                  AI Solutions
                </a>
              </li>

              <li>
                <a
                  href="/services/saas-development"
                  className="transition hover:text-violet-800"
                >
                  SaaS Development
                </a>
              </li>

              <li>
                <a
                  href="/services/digital-products"
                  className="transition hover:text-violet-800"
                >
                  Digital Products
                </a>
              </li>

              <li>
                <a
                  href="/services/brand-and-product-design"
                  className="transition hover:text-violet-800"
                >
                  UI/UX Design
                </a>
              </li>

              <li>
                <a
                  href="/services/automation-and-integrations"
                  className="transition hover:text-violet-800"
                >
                  Automation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= CONTACT SECTION ================= */}
        <div className="border-t border-slate-200 pt-8">

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Contact
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-slate-600">

                {/* Phone */}
                <li className="flex items-center gap-3">
                  <Phone
                    size={16}
                    className="text-violet-700"
                  />

                  <a
                    href="tel:8815190636"
                    className="transition hover:text-violet-800"
                  >
                    8815190636
                  </a>
                </li>

                {/* Location */}
                <li className="flex items-center gap-3">
                  <MapPin
                    size={16}
                    className="text-violet-700"
                  />

                  <span>
                    Indore, Madhya Pradesh, India
                  </span>
                </li>

              </ul>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">

              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group rounded-lg border border-slate-200 bg-white p-3 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                >
                  <Icon
                    size={18}
                    className="transition duration-300 group-hover:scale-110"
                  />
                </a>
              ))}

            </div>
          </div>

          {/* ================= COPYRIGHT ================= */}
          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">

            <p>
              © 2026 VEZIXA LABS. All rights reserved.
            </p>

            <p className="mt-2">
              Designed &amp; Developed with ❤️
            </p>

          </div>
        </div>
      </div>
    </motion.footer>
  );
}