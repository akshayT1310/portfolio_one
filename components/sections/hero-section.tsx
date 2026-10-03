'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="home" className="relative mx-auto flex min-h-[92svh] max-w-7xl items-center overflow-hidden px-6 pb-20 pt-32 lg:px-10">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="space-y-7"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 sm:text-sm">
            Software <span className="text-slate-400">·</span> AI <span className="text-slate-400">·</span> Digital Products
          </p>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] text-slate-950 sm:text-6xl xl:text-7xl">
              Building digital products that move businesses <span className="font-script font-semibold text-violet-700">forward.</span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              VEZIXA LABS designs and develops modern software, intelligent AI solutions and digital experiences built around real business needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-violet-400 px-5 py-3 font-bold text-[#07090d] transition-colors hover:bg-violet-300">
              Start a Project <ArrowRight size={18} />
            </a>
            <a href="#projects" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white/75 px-5 py-3 font-semibold text-slate-800 transition-colors hover:border-violet-300 hover:bg-violet-50">
              View Our Work <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-xl border border-white bg-slate-200 shadow-[0_32px_100px_rgba(15,23,42,0.16)]">
            <Image
              src="/hero-studio.jpg"
              alt="A product team planning a digital experience together"
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090d]/90 via-[#07090d]/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">Independent technology studio</p>
                <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">VEZIXA LABS</p>
              </div>
              <span className="rounded-md border border-white/15 bg-[#0d1117]/75 px-3 py-2 text-xs font-medium text-[#d5d9df] backdrop-blur">
                Software · AI · Products
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
