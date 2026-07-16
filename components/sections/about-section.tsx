'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Rocket, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Years Learning', value: '5+' },
  { label: 'Projects Built', value: '20+' },
  { label: 'Happy Clients', value: '15+' },
  { label: 'Technologies', value: '20+' }
];

const highlights = [
  { icon: BrainCircuit, title: 'AI-first thinking', desc: 'Designing intelligent product experiences with measurable impact.' },
  { icon: Code2, title: 'Developer-grade code', desc: 'Clean, scalable, and maintainable systems built for growth.' },
  { icon: Rocket, title: 'Fast execution', desc: 'From MVP to launch with velocity, clarity, and quality.' },
  { icon: ShieldCheck, title: 'Reliable delivery', desc: 'Thoughtful architecture and dependable implementation.' }
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-6 h-44 rounded-[24px] bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20" />
          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <div className="text-2xl font-semibold text-cyan-300">{item.value}</div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">About</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">I build products that feel fast, intelligent, and premium.</h2>
          </div>
          <p className="text-lg text-slate-400">
            I&apos;m a full-stack engineer and AI-focused builder with a strong eye for product, design, and execution. I blend frontend polish, backend reliability, and AI integrations into experiences that are both beautiful and useful.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <Icon className="mb-3 text-cyan-400" size={22} />
                  <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
