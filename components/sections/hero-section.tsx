'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import Image from 'next/image';

const badges = ['React', 'Next.js', 'Node', 'Express', 'PostgreSQL', 'TypeScript', 'Prisma', 'AI'];

export function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-10">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
            <Sparkles size={16} />
            Full Stack Developer • AI Engineer • Product Builder
          </div>
          <div className="space-y-4">
            <p className="text-lg text-slate-400">Hi, I&apos;m</p>
            <h1 className="text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              Akshay <span className="text-cyan-400">Tiwari</span>
            </h1>
            <div className="text-2xl font-medium text-slate-300 sm:text-3xl lg:text-4xl">
              Building <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text">AI-native</span> digital experiences.
            </div>
            <p className="max-w-2xl text-lg text-slate-400">
              I craft modern, scalable web applications with premium UX, robust systems, and intelligent AI integrations.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 font-medium text-white shadow-[0_0_45px_rgba(34,211,238,0.3)] transition hover:scale-[1.03]">
              Explore Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-100 backdrop-blur transition hover:bg-white/10">
              Hire Me
            </a>
            <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-100 backdrop-blur transition hover:bg-white/10">
              <Download size={16} /> Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto flex max-w-md items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-8 rounded-full border border-fuchsia-400/20" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.15),_transparent_60%)] blur-3xl" />
          <div className="relative h-[340px] w-[340px] rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 p-3 shadow-[0_0_90px_rgba(34,211,238,0.16)]">
            <Image src="/pic.png" alt="Akshay Tiwari" width={520} height={520} className="h-full w-full rounded-full object-cover" />
          </div>
          <div className="absolute inset-0">
            {badges.map((badge, index) => {
              const angle = (index / badges.length) * Math.PI * 2;
              const x = Math.cos(angle) * 140;
              const y = Math.sin(angle) * 140;
              return (
                <motion.span
                  key={badge}
                  className="absolute rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 backdrop-blur"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                >
                  {badge}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
