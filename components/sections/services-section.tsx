'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Boxes, Code2, Layers, PanelsTopLeft, Workflow } from 'lucide-react';
import { capabilities } from '@/data/capabilities';

const serviceIcons = {
  code: Code2,
  sparkles: Bot,
  layers: Layers,
  blocks: Boxes,
  panels: PanelsTopLeft,
  workflow: Workflow,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">What we build</p>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">
            Thoughtful technology, built around your next move.
          </h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end">
          VEZIXA LABS brings product thinking, engineering, and design together to help turn useful ideas into dependable digital experiences.
        </p>
      </div>

      <div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((service, index) => {
          const Icon = serviceIcons[service.icon];

          return (
          <motion.article
            key={service.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="group border-t border-slate-200 py-7 transition-colors hover:border-violet-400"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-800 transition-colors group-hover:bg-violet-100">
                <Icon size={21} strokeWidth={1.8} />
              </span>
              <span className="text-xs font-semibold tabular-nums text-slate-400">{service.number}</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-950">{service.title}</h3>
            <p className="mb-4 max-w-sm text-sm leading-6 text-slate-600">{service.description}</p>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-800 transition-colors hover:text-violet-950">
              Explore service <span aria-hidden="true">-&gt;</span>
            </Link>
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}