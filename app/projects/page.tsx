import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/components/sections/projects';
import { FloatingBackground } from '@/components/sections/floating-background';

export const metadata: Metadata = {
  title: 'Work | VEZIXA LABS',
  description: 'Explore digital products, websites, and software projects by VEZIXA LABS.',
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] px-6 pb-24 pt-32 text-slate-900">
      <FloatingBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Link href="/#home" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-violet-800">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Selected work · {projects.length} projects</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-950 sm:text-6xl">Digital products made with purpose.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A selection of websites, platforms, and digital experiences across real estate, hospitality, communication, and marketing.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={`${project.title}-${index}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-950/5 sm:p-5">
              <div className={`relative mb-5 aspect-[16/9] overflow-hidden rounded-lg ${project.imageFit === 'contain' ? 'bg-white p-10' : 'bg-slate-100'}`}>
                <Image
                  src={project.image}
                  alt={`${project.title} ${project.imageFit === 'contain' ? 'logo' : 'website preview'}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`${project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'} transition-transform duration-500 group-hover:scale-[1.03]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-md border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-violet-700">Project {String(index + 1).padStart(2, '0')}</p>
                  <h2 className="text-2xl font-bold text-slate-950">{project.title}</h2>
                </div>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-violet-300 hover:bg-violet-50">
                  Visit site <ArrowUpRight size={16} />
                </a>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20 flex flex-col gap-5 rounded-xl border border-slate-200 bg-white/80 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Have a project in mind?</p>
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">Let&apos;s build something that works for you.</h2>
          </div>
          <Link href="/#contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 font-bold text-white transition-colors hover:bg-violet-800">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}