'use client';

import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

const stats = [
  { label: 'Years Learning', value: '5+' },
  { label: 'Projects Built', value: '20+' },
  { label: 'Happy Clients', value: '15+' },
  { label: 'Technologies', value: '20+' },
];

const highlights = [
  {
    icon: BrainCircuit,
    title: 'AI-first thinking',
    desc: 'Designing intelligent product experiences with measurable impact.',
  },
  {
    icon: Code2,
    title: 'Developer-grade code',
    desc: 'Clean, scalable, and maintainable systems built for growth.',
  },
  {
    icon: Rocket,
    title: 'Fast execution',
    desc: 'From MVP to launch with velocity, clarity, and quality.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable delivery',
    desc: 'Thoughtful architecture and dependable implementation.',
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-10"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >

          {/* Developer Image */}
          <div className="group relative mb-6 h-72 overflow-hidden rounded-[24px] border border-white/10 bg-slate-950 sm:h-80">

            <img
              src="/about-developer.png"
              alt="Developer working on AI and software projects"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* AI Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/70 px-4 py-2 text-sm text-cyan-300 backdrop-blur-md">
              <BrainCircuit size={16} />
              AI & Full-Stack
            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-950/60"
              >
                <div className="text-2xl font-semibold text-cyan-300">
                  {item.value}
                </div>

                <div className="text-sm text-slate-400">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >

          {/* Heading */}
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
              About
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              I build products that feel fast, intelligent, and premium.
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-slate-400">
            I&apos;m a full-stack engineer and AI-focused builder with a strong
            eye for product, design, and execution. I blend frontend polish,
            backend reliability, and AI integrations into experiences that are
            both beautiful and useful.
          </p>

          {/* Highlights */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.07]"
                >
                  <Icon
                    className="mb-3 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                    size={22}
                  />

                  <h3 className="mb-2 font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}