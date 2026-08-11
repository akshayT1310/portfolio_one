'use client';

import { motion } from 'framer-motion';

export function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.15),_transparent_25%),radial-gradient(circle_at_80%_0%,_rgba(139,92,246,0.18),_transparent_25%)]" />

      {/* Moving Cyan Glow */}
      <motion.div
        className="absolute left-[5%] top-[15%] h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{
          x: [0, 180, 350, 180, 0],
          y: [0, 80, 180, -50, 0],
          scale: [1, 1.15, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Moving Purple Glow */}
      <motion.div
        className="absolute right-[5%] top-[25%] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{
          x: [0, -160, -300, -120, 0],
          y: [0, 100, -50, 180, 0],
          scale: [1, 1.2, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Running Light Line */}
      <motion.div
        className="absolute left-[-30%] top-[35%] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent blur-[2px]"
        animate={{
          x: ['0vw', '180vw'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Second Running Light */}
      <motion.div
        className="absolute right-[-30%] top-[70%] h-[2px] w-[30%] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent blur-[2px]"
        animate={{
          x: ['0vw', '-180vw'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Rotating Circle 1 */}
      <motion.div
        className="absolute left-[8%] top-[20%] h-56 w-56 rounded-full border border-cyan-400/10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
      </motion.div>

      {/* Rotating Circle 2 */}
      <motion.div
        className="absolute right-[10%] top-[50%] h-72 w-72 rounded-full border border-purple-400/10"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="absolute top-1/2 -right-1 h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_15px_#a855f7]" />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(18)].map((_, idx) => (
        <motion.span
          key={idx}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/60"
          style={{
            top: `${8 + idx * 4}%`,
            left: `${5 + (idx % 6) * 15}%`,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -30, 20, -40, 0],
            opacity: [0.2, 0.9, 0.4, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5 + (idx % 5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: idx * 0.15,
          }}
        />
      ))}

      {/* Moving Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        animate={{
          backgroundPosition: ['0px 0px', '70px 70px'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '70px 70px',
        }}
      />

    </div>
  );
}