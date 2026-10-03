'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { projects } from './projects';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10"
    >
      {/* Section Heading */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Selected Work</p>

          <h2 className="max-w-3xl text-3xl font-bold text-slate-950 sm:text-5xl">
            Digital products built with purpose.
          </h2>
        </div>
        <a href="/projects" className="inline-flex items-center gap-2 font-semibold text-violet-800 transition-colors hover:text-violet-950">
          View all projects <ArrowUpRight size={18} />
        </a>
      </div>

      {/* Projects */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
            }}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-950/5 sm:p-5"
          >
            <div className={`relative mb-5 h-52 overflow-hidden rounded-lg ${project.imageFit === 'contain' ? 'bg-white p-8' : 'bg-slate-100'}`}>
              <Image
                src={project.image}
                alt={`${project.title} ${project.imageFit === 'contain' ? 'logo' : 'website preview'}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`${project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'} transition-transform duration-500 group-hover:scale-[1.03]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-md border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur">
                {project.category}
              </span>
            </div>

            {/* Project Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-950 transition-colors group-hover:text-violet-800">
                {project.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-violet-800">
                {project.type}
              </p>
            </div>

            {/* Description */}
            <p className="mb-5 text-sm leading-6 text-slate-600">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
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
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-violet-300 hover:bg-violet-50"
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