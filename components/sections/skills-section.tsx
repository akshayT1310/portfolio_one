'use client';

import { motion } from 'framer-motion';
import { Cpu, Database, Globe2, Layers, Sparkles, Wrench } from 'lucide-react';

const categories = [
  { title: 'Frontend', icon: Globe2, items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { title: 'Backend', icon: Layers, items: ['Node.js', 'Express', 'REST APIs', 'GraphQL'] },
  { title: 'Database', icon: Database, items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { title: 'AI', icon: Cpu, items: ['OpenAI', 'LLM workflows', 'Agents', 'Prompt Engineering'] },
  { title: 'Cloud', icon: Sparkles, items: ['Vercel', 'Render', 'AWS', 'Firebase'] },
  { title: 'Tools', icon: Wrench, items: ['Git', 'Docker', 'Figma', 'Postman'] }
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Technology</p>
        <h2 className="text-3xl font-bold text-[#14251f] sm:text-4xl">The right tools, chosen for your goals.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.article key={category.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-lg border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3 text-emerald-700">
                <Icon size={22} />
                <h3 className="text-xl font-bold text-[#14251f]">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-slate-700">{item}</span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
