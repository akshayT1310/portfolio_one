'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Product Engineer',
    company: 'Signimus Technology Pvt. Ltd.',
    date: 'Apr 2025 – Present',
    description: 'Designing and shipping polished web products, AI-enabled workflows, and robust engineering systems.'
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Experience</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">A focused track record in product engineering and intelligent systems.</h2>
      </div>
      <div className="space-y-6">
        {experiences.map((item, index) => (
          <motion.article key={item.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-cyan-300">{item.company}</p>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{item.date}</div>
            </div>
            <p className="mt-4 max-w-3xl text-slate-400">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
