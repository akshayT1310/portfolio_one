'use client';

import { motion } from 'framer-motion';

export function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.15),_transparent_25%),radial-gradient(circle_at_80%_0%,_rgba(139,92,246,0.18),_transparent_25%)]" />
      <motion.div
        className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[12%] top-[30%] h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[...Array(18)].map((_, idx) => (
        <motion.span
          key={idx}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/60"
          style={{ top: `${8 + idx * 4}%`, left: `${5 + (idx % 6) * 15}%` }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + idx % 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
