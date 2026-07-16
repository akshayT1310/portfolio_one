'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'AI Chatbot',
    type: 'Conversational AI',
    description: 'A premium AI assistant experience with multi-turn support, fast response handling, and polished UX.',
    stack: ['Next.js', 'OpenAI', 'Vercel', 'PostgreSQL'],
    live: '#',
    github: '#'
  },
  {
    title: 'HandCraft Ecommerce',
    type: 'Marketplace',
    description: 'A full-stack handcrafted commerce platform with authentication, cart, orders, and seller flows.',
    stack: ['Django', 'PostgreSQL', 'Tailwind', 'Render'],
    live: '#',
    github: '#'
  },
  {
    title: 'Milk Record POS',
    type: 'Business Software',
    description: 'A modern POS and dairy operations product focused on billing, inventory, and reporting.',
    stack: ['Django', 'PostgreSQL', 'Bootstrap', 'Render'],
    live: '#',
    github: '#'
  },
  {
    title: 'Portfolio Site',
    type: 'Personal Brand',
    description: 'A cinematic developer portfolio designed with immersive motion, premium visual language, and responsive storytelling.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind'],
    live: '#',
    github: '#'
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Projects</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Selected work with an emphasis on impact and polish.</h2>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="group rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30">
            <div className="mb-5 h-40 rounded-[24px] bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20" />
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-cyan-300">{project.type}</p>
              </div>
            </div>
            <p className="mb-5 text-slate-400">{project.description}</p>
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-sm text-slate-300">{tech}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={project.live} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20">
                <ExternalLink size={15} /> Live Demo
              </a>
              <a href={project.github} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                <Github size={15} /> GitHub
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
