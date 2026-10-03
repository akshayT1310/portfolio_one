import { ChevronDown } from 'lucide-react';

const questions = [
  {
    question: 'What does VEZIXA LABS build?',
    answer: 'VEZIXA LABS builds modern websites, web applications, AI-powered solutions, SaaS products and digital experiences.',
  },
  {
    question: 'Can VEZIXA LABS build a custom software product?',
    answer: 'Yes. Projects can be designed around specific business requirements, workflows and product goals.',
  },
  {
    question: 'Does VEZIXA LABS work with AI?',
    answer: 'Yes. AI can be integrated into products through intelligent assistants, automation, AI-powered workflows and other practical applications.',
  },
  {
    question: 'Can you improve an existing website or application?',
    answer: 'Yes. Existing digital products can be redesigned, optimized and enhanced based on their current technology and requirements.',
  },
  {
    question: 'How does a project start?',
    answer: 'Projects begin by understanding the idea, requirements, users and business objectives before moving into planning, design and development.',
  },
  {
    question: 'What technologies do you work with?',
    answer: 'Depending on the project, we select suitable tools from technologies represented in our work, including React, Next.js, JavaScript, TypeScript, Node.js, PostgreSQL, Supabase and Vercel. AI and LLM integrations are considered where they fit the product requirements.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">FAQ</p>
          <h2 className="text-3xl font-bold text-slate-950 sm:text-5xl">A few useful answers.</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">Have a question about a project? Start a conversation and share what you have in mind.</p>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown size={18} className="shrink-0 text-violet-700 transition-transform group-open:rotate-180" />
              </summary>
              <p className="max-w-3xl pt-4 pr-8 text-sm leading-6 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}