import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { FloatingBackground } from '@/components/sections/floating-background';
import { services } from '@/data/services';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return { title: 'Service not found | VEZIXA LABS' };

  return {
    title: `${service.title} | VEZIXA LABS`,
    description: service.intro,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] pb-24 pt-32 text-slate-900">
      <FloatingBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Link href="/#services" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-violet-800">
          <ArrowLeft size={16} /> All services
        </Link>

        <section className="grid gap-12 border-b border-slate-200 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-violet-700">Service {service.number} · VEZIXA LABS</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-5 py-3 font-bold text-white transition-colors hover:bg-violet-800">
                Discuss this service <ArrowRight size={17} />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 py-3 font-semibold text-slate-800 transition-colors hover:border-violet-300 hover:bg-violet-50">
                View projects <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          <aside className="border-t border-slate-200 pt-6 lg:pb-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">A good fit for</p>
            <p className="text-base leading-7 text-slate-700">{service.idealFor}</p>
            <p className="mb-3 mt-7 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">The focus</p>
            <p className="text-base leading-7 text-slate-700">{service.description}</p>
          </aside>
        </section>

        <section className="grid gap-12 border-b border-slate-200 py-16 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">What we can deliver</p>
            <h2 className="mb-7 text-2xl font-bold text-slate-950 sm:text-3xl">A clear scope, shaped around your business.</h2>
            <ul className="space-y-4">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3 text-slate-700">
                  <Check size={18} className="mt-1 shrink-0 text-violet-700" />
                  <span className="leading-6">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Why it matters</p>
            <h2 className="mb-7 text-2xl font-bold text-slate-950 sm:text-3xl">Built to make the next step easier.</h2>
            <ul className="space-y-5">
              {service.outcomes.map((outcome, index) => (
                <li key={outcome} className="border-t border-slate-200 pt-4">
                  <span className="mr-3 text-xs font-bold tabular-nums text-violet-700">0{index + 1}</span>
                  <span className="font-medium leading-6 text-slate-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16">
          <div className="mb-9 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">How it works</p>
            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">A collaborative process, without the guesswork.</h2>
          </div>
          <div className="grid gap-x-8 md:grid-cols-3">
            {service.approach.map((step, index) => (
              <article key={step.title} className="border-t border-slate-200 py-6">
                <p className="mb-5 text-sm font-bold tabular-nums text-violet-700">STEP 0{index + 1}</p>
                <h3 className="mb-2 text-xl font-bold text-slate-950">{step.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">More ways to build</p>
              <h2 className="text-2xl font-bold text-slate-950">Related services</h2>
            </div>
            <Link href="/#services" className="text-sm font-bold text-violet-800 hover:text-violet-950">All services</Link>
          </div>
          <div className="grid gap-x-8 md:grid-cols-3">
            {relatedServices.map((related) => (
              <Link key={related.slug} href={`/services/${related.slug}`} className="group border-t border-slate-200 py-5">
                <span className="mb-2 block text-xs font-semibold text-slate-400">Service {related.number}</span>
                <span className="flex items-center justify-between gap-3 font-bold text-slate-900 group-hover:text-violet-800">
                  {related.title}<ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white/80 p-7 text-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Ready to get started?</p>
            <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s talk about what your business needs.</h2>
          </div>
          <Link href="/#contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 font-bold text-white transition-colors hover:bg-violet-800">
            Start a conversation <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}