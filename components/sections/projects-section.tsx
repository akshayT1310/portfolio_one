'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Adsaffairs',
    type: 'Digital Marketing & Growth Agency',
    image: '/projects/adsaffairs.png',
    description:
      'A premium digital growth platform focused on creative branding, performance marketing, lead generation, and scalable digital solutions.',
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'Digital Marketing'],
    live: 'https://adsaffairs.com',
  },
  {
    title: 'ContactCalls',
    type: 'Communication & Call Center Solutions',
    image: '/projects/contactcalls.png',
    description:
      'A professional business communication platform providing customer support, call center, lead generation, and multi-channel communication solutions.',
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'Responsive UI'],
    live: 'https://www.contactcalls.com',
  },
  {
    title: 'ExpertAd',
    type: 'Performance Marketing Platform',
    image: '/projects/expertad.png',
    description:
      'A performance-driven advertising platform built around affiliate marketing, lead generation, media buying, analytics, and growth solutions.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Performance Marketing'],
    live: 'https://www.expertad.co.in',
  },
  {
    title: 'KSR Realty Ventures',
    type: 'Real Estate & Property Development',
    image: '/projects/ksrrealty.png',
    description:
      'A premium real estate platform showcasing property development, residential projects, luxury homes, and real estate investment opportunities.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Real Estate'],
    live: 'https://www.ksrrealtyventures.in',
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10"
    >
      {/* Section Heading */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Projects
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            Selected work with an emphasis on impact and polish.
          </h2>
        </div>
      </div>

      {/* Projects */}
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
            }}
            className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07]"
          >
            {/* Project Preview */}
            <div className="relative mb-6 flex h-44 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-950 to-fuchsia-500/20">

              {/* Glow */}
              <div className="absolute h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-500 group-hover:scale-150" />

              {/* Browser Window */}
              <div className="relative w-[90%] overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">

                {/* Browser Header */}
                <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />

                  <div className="ml-2 flex-1 overflow-hidden rounded-md bg-white/5 px-3 py-1 text-[9px] text-slate-500">
                    {project.live.replace('https://', '')}
                  </div>
                </div>

                {/* Actual Website Image */}
                <div className="relative h-24 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={`${project.title} website preview`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-cyan-300">
                {project.title}
              </h3>

              <p className="mt-1 text-sm text-cyan-300">
                {project.type}
              </p>
            </div>

            {/* Description */}
            <p className="mb-5 leading-relaxed text-slate-400">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-sm text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Button */}
            <div className="flex gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-100"
              >
                <ExternalLink size={15} />
                Visit Website
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}