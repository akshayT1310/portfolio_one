'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import Image from 'next/image';

const badges = [
  'React',
  'Next.js',
  'Node',
  'Express',
  'PostgreSQL',
  'TypeScript',
  'Prisma',
  'AI',
];

export function HeroSection() {
  return (
    <section
      className="relative mx-auto flex min-h-screen max-w-7xl items-center overflow-hidden px-6 py-24 lg:px-10"
    >
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur"
          >
            <Sparkles size={16} className="text-cyan-300" />

            Full Stack Developer • Technical Engineer • Product Builder
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-400"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.4,
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
>
  <span className="relative inline-block">
    Akshay
  </span>{' '}

  <motion.span
    className="relative inline-block bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent"
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{
      backgroundSize: '200% 200%',
    }}
  >
    Tiwari

    {/* Glow */}
    <motion.span
      className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-fuchsia-500/30 blur-2xl"
      animate={{
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </motion.span>
</motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-2xl font-medium text-slate-300 sm:text-3xl lg:text-4xl"
            >
              Building{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                AI-native
              </span>{' '}
              digital experiences.
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              I craft modern, scalable web applications with premium UX,
              robust systems, and intelligent AI integrations.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 font-medium text-white shadow-[0_0_45px_rgba(34,211,238,0.3)] transition duration-300 hover:scale-[1.04]"
            >
              Explore Work
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-100 backdrop-blur transition duration-300 hover:bg-white/10 hover:border-cyan-400/30"
            >
              Hire Me
            </a>

            <a
              href="/.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-medium text-slate-100 backdrop-blur transition duration-300 hover:bg-white/10 hover:border-cyan-400/30"
            >
              <Download size={16} />
            Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT PROFILE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className="relative mx-auto flex max-w-md items-center justify-center"
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-[-20px] rounded-full border border-cyan-400/10"
            animate={{
              rotate: 360,
              scale: [1, 1.03, 1],
            }}
            transition={{
              rotate: {
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />

          {/* Inner rotating ring */}
          <motion.div
            className="absolute inset-6 rounded-full border border-fuchsia-400/20"
            animate={{ rotate: -360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.18),_transparent_60%)] blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Profile image */}
          <motion.div
            className="relative h-[340px] w-[340px] rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 p-3 shadow-[0_0_90px_rgba(34,211,238,0.16)]"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/pic.png"
              alt="Akshay Tiwari"
              width={520}
              height={520}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </motion.div>

          {/* Technology badges */}
          <div className="absolute inset-0">
            {badges.map((badge, index) => {
              const angle =
                (index / badges.length) * Math.PI * 2;

              const x = Math.cos(angle) * 155;
              const y = Math.sin(angle) * 155;

              return (
                <motion.span
                  key={badge}
                  className="absolute rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 shadow-lg backdrop-blur-md sm:text-sm"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    y: [-4, 4, -4],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3 + (index % 3),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.15,
                  }}
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