'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Technical Software Engineer',
    company: 'KSR Realty Ventures Pvt. Ltd. — Indore',
    date: 'Jul 2026 – Present',
    description:
      'Developing and maintaining modern web applications and digital solutions for real estate operations. Working across frontend development, responsive UI, website optimization, software integration, and technical implementation to improve business workflows and digital experiences.',
  },
  {
    title: 'Product Engineer',
    company: 'Signimus Technology Pvt. Ltd.',
    date: 'jan 2026 – Jun 2026',
    description:
      'Designed and shipped polished web products, AI-enabled workflows, and robust engineering systems with a focus on scalable architecture, responsive interfaces, and reliable product delivery.',
  },
  {
    title: 'Freelance Software Developer',
    company: 'Self-Employed — Freelance',
    date: 'jun 2025 – Dec 2025',
    description:
      'Worked independently with clients to design and develop responsive websites and custom software solutions. Managed projects from requirements and UI development to deployment, optimization, and ongoing technical support.',
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-10"
    >
      {/* Heading */}
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
          Experience
        </p>

        <h2 className="max-w-4xl text-3xl font-semibold text-white sm:text-4xl">
          A focused track record in product engineering and intelligent systems.
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
            className="group rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-cyan-300">
                  {item.title}
                </h3>

                <p className="mt-1 text-cyan-300">
                  {item.company}
                </p>
              </div>

              <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                {item.date}
              </div>
            </div>

            <p className="mt-4 max-w-4xl leading-relaxed text-slate-400">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}