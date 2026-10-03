import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white bg-slate-100 shadow-lg shadow-slate-900/10">
          <Image
            src="/about-developer.png"
            alt="A workspace for creating software and digital products"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent" />
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">About the studio</p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">About VEZIXA LABS</h2>
          <p className="mt-5 text-xl font-semibold leading-snug text-slate-700 sm:text-2xl">
            Building <span className="font-script text-4xl font-semibold text-violet-700 sm:text-5xl">thoughtful</span> technology for the next generation of digital products.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            VEZIXA LABS is a software and digital product studio focused on building high-performance web experiences, intelligent AI solutions and scalable digital products. We combine engineering, design and emerging technology to turn ideas into useful, refined and reliable digital experiences.
          </p>
          <div className="mt-8 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Engineering</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Reliable foundations for useful software.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Design</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Clear interfaces shaped around people.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Emerging technology</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Practical AI where it serves the product.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}