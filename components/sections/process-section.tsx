const steps = [
  { number: '01', title: 'Understand', description: 'Clarify the idea, users, requirements, and business objectives before shaping the scope.' },
  { number: '02', title: 'Plan & design', description: 'Map the key experience and agree on a practical direction for the product.' },
  { number: '03', title: 'Build & review', description: 'Develop in clear stages, share progress, and review the important user journeys.' },
  { number: '04', title: 'Launch & learn', description: 'Prepare the release, hand over the work, and identify useful next improvements.' },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">How we work</p>
        <h2 className="text-3xl font-bold text-slate-950 sm:text-5xl">A clear path from idea to release.</h2>
      </div>
      <div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step) => (
          <article key={step.number} className="border-t border-slate-200 py-6 transition-colors hover:border-violet-400">
            <p className="mb-8 text-xs font-bold tracking-[0.16em] text-violet-700">STEP {step.number}</p>
            <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}