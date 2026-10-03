'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Product Engineer',
    company: 'Signimus Technology Pvt. Ltd.',
    date: 'Jan 2026 – Present',
    description:
      'Designed and shipped polished web products, AI-enabled workflows, and robust engineering systems with a focus on scalable architecture, responsive interfaces, and reliable product delivery.',
  },
  {
    title: 'Freelance Software Developer',
    company: 'Self-Employed — Freelance',
    date: 'Jun 2025 – Dec 2025',
    description:
      'Worked independently with clients to design and develop responsive websites and custom software solutions. Managed projects from requirements and UI development to deployment, optimization, and ongoing technical support.',
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10"
    >
      {/* Heading */}
      <div className="mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
          Experience
        </p>

        <h2 className="max-w-4xl text-3xl font-bold text-[#14251f] sm:text-4xl">
          A reliable process, from first conversation to launch day.
        </h2>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {experiences.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.title}`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
            }}
            className="group rounded-lg border border-slate-200/80 bg-white/75 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-lg hover:shadow-emerald-950/5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#14251f] transition-colors group-hover:text-emerald-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-emerald-800">
                  {item.company}
                </p>
              </div>

              <div className="rounded-md border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900">
                {item.date}
              </div>
            </div>

            <p className="mt-4 max-w-4xl leading-relaxed text-slate-600">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}