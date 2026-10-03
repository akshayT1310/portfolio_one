'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

const API = '';

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim()) next.message = 'Message is required';

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok || !data.ok) {
        const fallbackMessage = data?.message || 'Submission failed';
        setErrors(data?.errors || { email: fallbackMessage });
        return;
      }

      setSuccess('Message sent successfully. I will get back to you soon.');
      setForm(initialState);
    } catch (error) {
      setLoading(false);
      setErrors({ email: 'Unable to reach the server right now. Please try again in a moment.' });
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 pb-24 pt-16 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-slate-200 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-9">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Start a conversation</p>
            <h2 className="text-3xl font-bold text-slate-950 sm:text-5xl">Have an idea worth building?</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Let&apos;s turn your idea into a thoughtful digital product built for today and designed for what&apos;s next.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3"><Mail size={18} className="text-violet-700" /> <a href="mailto:takshaymain13@gmail.com" className="hover:text-violet-800">takshaymain13@gmail.com</a></div>
              <div className="flex items-center gap-3"><MapPin size={18} className="text-violet-700" /> Indore, India</div>
            </div>
            <div className="mt-8 flex gap-4">
              <a aria-label="GitHub" href="https://github.com/akshayT1310" className="rounded-lg border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-violet-300 hover:text-violet-800"><Github size={18} /></a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/akshay-tiwari3511/" className="rounded-lg border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-violet-300 hover:text-violet-800"><Linkedin size={18} /></a>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 sm:p-6">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input aria-label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" placeholder="Full name" />
                  {errors.name ? <p className="mt-2 text-sm text-rose-700">{errors.name}</p> : null}
                </div>
                <div>
                  <input aria-label="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" placeholder="Email address" />
                  {errors.email ? <p className="mt-2 text-sm text-rose-700">{errors.email}</p> : null}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input aria-label="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" placeholder="Phone number" />
                  {errors.phone ? <p className="mt-2 text-sm text-rose-700">{errors.phone}</p> : null}
                </div>
                <div>
                  <input aria-label="Project subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" placeholder="Project subject" />
                  {errors.subject ? <p className="mt-2 text-sm text-rose-700">{errors.subject}</p> : null}
                </div>
              </div>
              <div>
                <textarea aria-label="Project details" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-[140px] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" placeholder="Tell me a little about your project" />
                {errors.message ? <p className="mt-2 text-sm text-rose-700">{errors.message}</p> : null}
              </div>
              {success ? <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p> : null}
              <button disabled={loading} className="rounded-lg bg-violet-700 px-6 py-3 font-bold text-white transition-colors hover:bg-violet-800 disabled:cursor-wait disabled:opacity-70">
                {loading ? 'Submitting...' : 'Start a Project'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
