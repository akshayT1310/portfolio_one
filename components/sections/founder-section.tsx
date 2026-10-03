import Image from 'next/image';

export function FounderSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Leadership</p>
        <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">Meet the Founder</h2>
      </div>
      <div className="grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-[260px_1fr] md:gap-12 lg:grid-cols-[320px_1fr]">
        <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-xl border border-white bg-slate-100 shadow-lg shadow-slate-900/10">
          <Image
            src="/pic.png"
            alt="Akshay Tiwari, Founder and CEO of VEZIXA LABS"
            fill
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-800">Founder &amp; CEO</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-950 sm:text-5xl">Mr.Akshay Tiwari</h3>
          <p className="mt-6 text-base leading-7 text-slate-600 sm:hidden">
            Founder &amp; CEO of VEZIXA LABS, building modern software, AI solutions and digital products through thoughtful design and strong engineering.
          </p>
          <p className="mt-6 hidden max-w-3xl text-lg leading-8 text-slate-600 sm:block">
            Akshay Tiwari is the Founder &amp; CEO of VEZIXA LABS, focused on building modern software, AI solutions and digital products that combine thoughtful design, strong engineering and practical technology. Through VEZIXA LABS, he works on turning ideas into scalable digital experiences designed for real-world impact.
          </p>
          <p className="mt-8 max-w-xl border-l-2 border-violet-500 pl-4 text-sm leading-6 text-slate-500">
            A hands-on approach to product thinking, engineering, and design.
          </p>
        </div>
      </div>
    </section>
  );
}