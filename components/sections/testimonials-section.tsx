'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Rahul Sharma',
    role: 'Business Owner',
    review: 'VEZIXA LABS understood the vision quickly and turned it into a clean, professional digital experience. The communication and attention to detail made the entire process smooth.',
  },
  {
    name: 'Priya Mehta',
    role: 'Marketing Consultant',
    review: 'The final website feels modern, fast and easy to use. VEZIXA LABS brought both strong design thinking and solid technical execution to the project.',
  },
  {
    name: 'Arjun Kapoor',
    role: 'Startup Founder',
    review: 'What stood out was the ability to take a complex idea and turn it into a simple digital product. The result was polished, responsive and built with scalability in mind.',
  },
  {
    name: 'Neha Verma',
    role: 'Business Consultant',
    review: 'From the initial concept to the final implementation, the process was structured and professional. The attention given to user experience made a real difference.',
  },
  {
    name: 'Rohan Malhotra',
    role: 'Entrepreneur',
    review: 'VEZIXA LABS delivered a digital experience that looks premium and performs smoothly across devices. The development quality and responsiveness were impressive.',
  },
  {
    name: 'Ananya Singh',
    role: 'Product & Marketing',
    review: 'A thoughtful approach to design and development. The team focused on understanding the actual requirement instead of simply building a template.',
  },
];

function getCardsPerPage() {
  if (typeof window === 'undefined') return 3;
  if (window.matchMedia('(min-width: 1024px)').matches) return 3;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
}

function scrollReviews(slider: HTMLDivElement, direction: -1 | 1) {
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  if (direction > 0 && slider.scrollLeft >= maxScroll - 8) {
    slider.scrollTo({ left: 0, behavior });
    return;
  }

  if (direction < 0 && slider.scrollLeft <= 8) {
    slider.scrollTo({ left: maxScroll, behavior });
    return;
  }

  slider.scrollBy({ left: direction * slider.clientWidth, behavior });
}

export function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const pageCount = Math.ceil(reviews.length / cardsPerPage);

  useEffect(() => {
    const updateCardsPerPage = () => setCardsPerPage(getCardsPerPage());
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  useEffect(() => {
    setActivePage((page) => Math.min(page, pageCount - 1));
  }, [pageCount]);

  function moveSlider(direction: -1 | 1) {
    const slider = sliderRef.current;
    if (!slider) return;
    scrollReviews(slider, direction);
  }

  function moveToPage(page: number) {
    const slider = sliderRef.current;
    if (!slider) return;

    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    slider.scrollTo({ left: page * slider.clientWidth, behavior });
  }

  function updateActivePage() {
    const slider = sliderRef.current;
    if (!slider || slider.clientWidth === 0) return;
    setActivePage(Math.min(pageCount - 1, Math.round(slider.scrollLeft / slider.clientWidth)));
  }

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      const slider = sliderRef.current;
      if (slider) scrollReviews(slider, 1);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden border-y border-violet-200/70 bg-transparent py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="mb-8 text-center md:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Client Feedback</p>
          <div className="grid grid-cols-[44px_1fr_44px] items-center gap-2 sm:gap-5">
            <button
              type="button"
              aria-label="Previous testimonial group"
              onClick={() => moveSlider(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-teal-700 transition-colors hover:bg-teal-50 hover:text-teal-900 sm:h-11 sm:w-11"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 id="testimonials-heading" className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Built with purpose. Appreciated by the people we work with.
            </h2>
            <button
              type="button"
              aria-label="Next testimonial group"
              onClick={() => moveSlider(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-teal-700 transition-colors hover:bg-teal-50 hover:text-teal-900 sm:h-11 sm:w-11"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Thoughtful design, reliable engineering and digital experiences built around real business needs.
          </p>
          <div className="mt-5 flex items-center justify-center gap-1.5" aria-label={`Review group ${activePage + 1} of ${pageCount}`}>
            {Array.from({ length: pageCount }, (_, page) => (
              <button
                key={page}
                type="button"
                aria-label={`Go to testimonial group ${page + 1}`}
                aria-current={activePage === page ? 'true' : undefined}
                onClick={() => moveToPage(page)}
                className="flex h-7 w-7 items-center justify-center rounded-full"
              >
                <span className={`h-2 w-2 rounded-full transition-all ${activePage === page ? 'scale-125 bg-teal-600 ring-4 ring-teal-100' : 'bg-slate-300 hover:bg-teal-400'}`} />
              </button>
            ))}
          </div>
        </header>

        <div
          ref={sliderRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client feedback"
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onScroll={updateActivePage}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
          }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              data-review-card
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${reviews.length}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
              className={`group relative isolate flex min-h-[300px] shrink-0 basis-full snap-start flex-col items-center rounded-xl border border-white/10 bg-[#303235] px-6 py-7 text-center shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 before:pointer-events-none before:absolute before:-inset-x-1 before:-inset-y-1 before:-z-10 before:translate-x-2 before:translate-y-2 before:rounded-xl before:bg-gradient-to-br before:from-teal-400/90 before:to-cyan-400/70 before:transition-transform before:duration-300 hover:-translate-y-1 hover:border-teal-300/40 hover:bg-[#383a3d] hover:shadow-[0_22px_64px_rgba(0,0,0,0.28)] group-hover:before:translate-x-3 group-hover:before:translate-y-3 sm:min-h-[320px] sm:basis-[calc(50%-0.5rem)] sm:px-7 lg:basis-[calc(33.333%-0.667rem)] ${index % 3 === 1 ? 'lg:z-10 lg:scale-[1.035] lg:before:rotate-[-1deg]' : 'lg:scale-[0.97] lg:before:rotate-[1.5deg]'}`}
            >
              <div aria-hidden="true" className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-teal-100 to-cyan-100 text-sm font-bold text-teal-800 shadow-sm">
                {review.name.split(' ').map((part) => part[0]).join('')}
              </div>
              <h3 className="text-lg font-bold text-white">{review.name}</h3>
              <p className="mt-1 text-xs font-medium text-slate-300">{review.role}</p>
              <Quote aria-hidden="true" size={28} strokeWidth={1.8} className="mb-3 mt-5 text-teal-300" />
              <p className="flex-1 text-sm leading-6 text-slate-200 sm:text-[15px] sm:leading-7">
                {review.review}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}