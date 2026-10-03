import { ArrowUpRight, Bot, Layers3, Workflow } from 'lucide-react';

const capabilities = [
  { icon: Bot, title: 'AI-powered experiences', description: 'Assistants and intelligent features designed around useful, well-defined tasks.' },
  { icon: Layers3, title: 'Digital products & SaaS', description: 'Web products shaped around clear user journeys and evolving product goals.' },
  { icon: Workflow, title: 'Connected workflows', description: 'Integrations and automation planned with people and existing systems in mind.' },
];

export function AiProductsSection() {
  return (
    <section className="relative border-y border-slate-200 bg-violet-50/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">AI &amp; Digital Products</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">Useful technology, not technology for its own sake.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            VEZIXA LABS designs and develops modern digital products, intelligent software and AI-powered experiences for businesses that want to build, improve and scale.
          </p>
          <a href="#services" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800 transition-colors hover:text-cyan-950">
            Explore capabilities <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <article key={title} className="grid gap-4 py-5 sm:grid-cols-[44px_1fr] sm:gap-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-200 bg-white/80 text-cyan-800">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="font-semibold text-slate-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}