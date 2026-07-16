'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, Eye, FileDown, LogOut, LayoutGrid, Inbox } from 'lucide-react';

const API = 'http://localhost:5000';

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

type Stats = {
  total: number;
  today: number;
  weekly: number;
  monthly: number;
};

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('admin@portfolio.dev');
  const [password, setPassword] = useState('admin1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch(`${API}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (!data.ok) {
      setError(data.message || 'Login failed');
      return;
    }
    localStorage.setItem('admin_token', data.token);
    onSuccess();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
        <h2 className="text-3xl font-semibold text-white">Admin Login</h2>
        <p className="mt-2 text-slate-400">Access the portfolio inbox securely.</p>
        <form onSubmit={login} className="mt-6 space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" placeholder="Email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white" placeholder="Password" />
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <button disabled={loading} className="w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-5 py-3 font-medium text-white">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, weekly: 0, monthly: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('admin_token');
        const [messagesRes, statsRes] = await Promise.all([
          fetch(`${API}/api/admin/messages`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API}/api/admin/messages/stats`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        const messagesData = await messagesRes.json().catch(() => ({ data: [] }));
        const statsData = await statsRes.json().catch(() => ({ data: { total: 0, today: 0, weekly: 0, monthly: 0 } }));
        setMessages(messagesData.data || []);
        setStats(statsData.data || { total: 0, today: 0, weekly: 0, monthly: 0 });
      } catch (err) {
        setError('Unable to load inbox right now. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [loggedIn]);

  async function remove(id: string) {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(`${API}/api/admin/messages/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (err) {
      setError('Unable to delete this message right now.');
    }
  }

  const filtered = useMemo(() => messages.filter((message) => {
    const hay = `${message.name} ${message.email} ${message.subject} ${message.message}`.toLowerCase();
    const matchesSearch = hay.includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || message.subject.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  }), [messages, search, filter]);

  if (!loggedIn) return <AdminLogin onSuccess={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Admin panel</p>
            <h1 className="text-3xl font-semibold">Contact Messages Dashboard</h1>
          </div>
          <button onClick={() => { localStorage.removeItem('admin_token'); setLoggedIn(false); }} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Logout</button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[{ label: 'Total Messages', value: stats.total }, { label: 'Today', value: stats.today }, { label: 'This Week', value: stats.weekly }, { label: 'This Month', value: stats.monthly }].map((card) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-cyan-300">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {error ? <div className="mb-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        <div className="rounded-[30px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none" placeholder="Search messages" />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-slate-100">
                <option value="all">All Subjects</option>
                <option value="project">Project</option>
                <option value="consultation">Consultation</option>
                <option value="career">Career</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
                <FileDown size={16} /> Export
              </button>
            </div>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => <div key={index} className="h-14 animate-pulse rounded-2xl bg-white/10" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-white/10 p-8 text-center text-slate-400">No messages found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Phone</th>
                    <th className="px-3 py-3">Subject</th>
                    <th className="px-3 py-3">Message</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((message) => (
                    <tr key={message.id} className="border-b border-white/10 text-slate-200">
                      <td className="px-3 py-3">{message.name}</td>
                      <td className="px-3 py-3">{message.email}</td>
                      <td className="px-3 py-3">{message.phone}</td>
                      <td className="px-3 py-3">{message.subject}</td>
                      <td className="max-w-[220px] px-3 py-3 truncate">{message.message}</td>
                      <td className="px-3 py-3">{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setSelected(message)} className="rounded-full border border-cyan-400/20 bg-cyan-500/10 p-2 text-cyan-200"><Eye size={15} /></button>
                          <button onClick={() => remove(message.id)} className="rounded-full border border-rose-400/20 bg-rose-500/10 p-2 text-rose-200"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-900/90 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">Message Details</h3>
              <button onClick={() => setSelected(null)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">Close</button>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <div><span className="text-slate-500">Name:</span> {selected.name}</div>
              <div><span className="text-slate-500">Email:</span> {selected.email}</div>
              <div><span className="text-slate-500">Phone:</span> {selected.phone}</div>
              <div><span className="text-slate-500">Subject:</span> {selected.subject}</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">{selected.message}</div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
