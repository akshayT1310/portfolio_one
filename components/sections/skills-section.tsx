'use client';

import { motion } from 'framer-motion';
import { Cpu, Database, Globe2, Layers, Sparkles, Wrench } from 'lucide-react';

const categories = [
  { title: 'Frontend', icon: Globe2, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { title: 'Backend', icon: Layers, items: ['Node.js', 'Express', 'REST APIs', 'GraphQL'] },
  { title: 'Database', icon: Database, items: ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis'] },
  { title: 'AI', icon: Cpu, items: ['OpenAI', 'LLM workflows', 'Agents', 'Prompt Engineering'] },
  { title: 'Cloud', icon: Sparkles, items: ['Vercel', 'Render', 'AWS', 'Firebase'] },
  { title: 'Tools', icon: Wrench, items: ['Git', 'Docker', 'Figma', 'Postman'] }
];

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Skills</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">A stack designed for building fast, intelligent products.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.article key={category.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3 text-cyan-400">
                <Icon size={22} />
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-sm text-slate-200">{item}</span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
