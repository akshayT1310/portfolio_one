'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
    <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[36px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-400">Contact</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Let&apos;s build something exceptional together.</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
              Available for ambitious product builds, AI integrations, and high-quality web platforms.
            </p>
            <div className="mt-8 space-y-4 text-slate-300">
              <div className="flex items-center gap-3"><Mail size={18} className="text-cyan-400" /> takshaymain13@gmail.com</div>
              <div className="flex items-center gap-3"><MapPin size={18} className="text-cyan-400" /> Indore, India</div>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://github.com/akshayT1310" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/akshay-tiwari3511/" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"><Linkedin size={18} /></a>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Full Name" />
                  {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name}</p> : null}
                </div>
                <div>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Email Address" />
                  {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email}</p> : null}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Phone Number" />
                  {errors.phone ? <p className="mt-2 text-sm text-rose-300">{errors.phone}</p> : null}
                </div>
                <div>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Subject" />
                  {errors.subject ? <p className="mt-2 text-sm text-rose-300">{errors.subject}</p> : null}
                </div>
              </div>
              <div>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" placeholder="Message" />
                {errors.message ? <p className="mt-2 text-sm text-rose-300">{errors.message}</p> : null}
              </div>
              {success ? <p className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{success}</p> : null}
              <button disabled={loading} className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-6 py-3 font-medium text-white">
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
