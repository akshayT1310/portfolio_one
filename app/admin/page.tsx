'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Trash2,
  Eye,
  FileDown,
  LogOut,
  RefreshCw,
  X,
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || '';

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

const emptyStats: Stats = {
  total: 0,
  today: 0,
  weekly: 0,
  monthly: 0,
};

function AdminLogin({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('admin@portfolio.dev');
  const [password, setPassword] = useState('admin1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.message || 'Invalid email or password.');
        return;
      }

      if (!data.token) {
        setError('Login succeeded but no authentication token was returned.');
        return;
      }

      localStorage.setItem('admin_token', data.token);

      onSuccess();
    } catch {
      setError(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-xl"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          Portfolio
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-white">
          Admin Login
        </h2>

        <p className="mt-2 text-slate-400">
          Access your contact messages securely.
        </p>

        <form onSubmit={login} className="mt-6 space-y-4">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/40"
              placeholder="Password"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>(emptyStats);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter, setFilter] = useState('all');

  /*
   * Check saved login token.
   */
  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    setLoggedIn(Boolean(token));
    setCheckingAuth(false);
  }, []);

  /*
   * Load dashboard data.
   */
  async function loadDashboard(showRefresh = false) {
    const token = localStorage.getItem('admin_token');

    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError('');

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [messagesRes, statsRes] = await Promise.all([
        fetch(`${API}/api/admin/messages`, {
          method: 'GET',
          headers,
          cache: 'no-store',
        }),

        fetch(`${API}/api/admin/messages/stats`, {
          method: 'GET',
          headers,
          cache: 'no-store',
        }),
      ]);

      /*
       * If token expired or backend returns unauthorized,
       * log the admin out.
       */
      if (
        messagesRes.status === 401 ||
        messagesRes.status === 403 ||
        statsRes.status === 401 ||
        statsRes.status === 403
      ) {
        localStorage.removeItem('admin_token');
        setLoggedIn(false);
        setMessages([]);
        setStats(emptyStats);
        setError('Your session has expired. Please login again.');
        return;
      }

      const messagesData = await messagesRes
        .json()
        .catch(() => ({ data: [] }));

      const statsData = await statsRes
        .json()
        .catch(() => ({ data: emptyStats }));

      if (!messagesRes.ok) {
        throw new Error(
          messagesData?.message || 'Unable to load messages.'
        );
      }

      setMessages(
        Array.isArray(messagesData?.data)
          ? messagesData.data
          : []
      );

      setStats({
        total: Number(statsData?.data?.total || 0),
        today: Number(statsData?.data?.today || 0),
        weekly: Number(statsData?.data?.weekly || 0),
        monthly: Number(statsData?.data?.monthly || 0),
      });
    } catch (err) {
      console.error('Dashboard error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load inbox right now.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  /*
   * Load data after login.
   */
  useEffect(() => {
    if (!loggedIn) return;

    loadDashboard();
  }, [loggedIn]);

  /*
   * Logout.
   */
  function logout() {
    localStorage.removeItem('admin_token');

    setLoggedIn(false);
    setMessages([]);
    setStats(emptyStats);
    setSelected(null);
    setSearch('');
    setFilter('all');
    setError('');
  }

  /*
   * Delete message.
   */
  async function remove(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmed) return;

    const token = localStorage.getItem('admin_token');

    if (!token) {
      logout();
      return;
    }

    try {
      setError('');

      const res = await fetch(
        `${API}/api/admin/messages/${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json().catch(() => ({}));

      if (res.status === 401 || res.status === 403) {
        logout();
        setError('Your session has expired. Please login again.');
        return;
      }

      if (!res.ok || data.ok === false) {
        throw new Error(
          data?.message || 'Unable to delete this message.'
        );
      }

      setMessages((prev) =>
        prev.filter((message) => message.id !== id)
      );

      setSelected((prev) =>
        prev?.id === id ? null : prev
      );

      /*
       * Refresh stats after deleting.
       */
      await loadDashboard(true);
    } catch (err) {
      console.error('Delete error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete this message right now.'
      );
    }
  }

  /*
   * Search + filter.
   */
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return messages.filter((message) => {
      const haystack = [
        message.name,
        message.email,
        message.phone,
        message.subject,
        message.message,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        !query || haystack.includes(query);

      const matchesFilter =
        filter === 'all' ||
        message.subject
          .toLowerCase()
          .includes(filter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [messages, search, filter]);

  /*
   * Export messages as CSV.
   */
  function exportCSV() {
    if (!filtered.length) {
      setError('There are no messages to export.');
      return;
    }

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Message',
      'Date',
    ];

    const escapeCSV = (value: unknown) => {
      const stringValue = String(value ?? '');

      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const rows = filtered.map((message) => [
      message.name,
      message.email,
      message.phone,
      message.subject,
      message.message,
      new Date(message.createdAt).toLocaleString(),
    ]);

    const csv = [
      headers.map(escapeCSV).join(','),
      ...rows.map((row) =>
        row.map(escapeCSV).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = `contact-messages-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /*
   * Auth loading screen.
   */
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
          <p className="mt-4 text-sm text-slate-400">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Login screen.
   */
  if (!loggedIn) {
    return (
      <AdminLogin
        onSuccess={() => {
          setError('');
          setLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              Admin Panel
            </p>

            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
              Contact Messages Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage messages received from your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadDashboard(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={refreshing ? 'animate-spin' : ''}
              />
              Refresh
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              label: 'Total Messages',
              value: stats.total,
            },
            {
              label: 'Today',
              value: stats.today,
            },
            {
              label: 'This Week',
              value: stats.weekly,
            },
            {
              label: 'This Month',
              value: stats.monthly,
            },
          ].map((card, index) => (
            <motion.div
              key={card.label}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
            >
              <p className="text-sm text-slate-400">
                {card.label}
              </p>

              <p className="mt-2 text-3xl font-semibold text-cyan-300">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Error */}
        {error ? (
          <div className="mb-4 flex items-center justify-between gap-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <span>{error}</span>

            <button
              onClick={() => setError('')}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        ) : null}

        {/* Inbox */}
        <div className="rounded-[30px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            {/* Search */}
            <div className="flex w-full items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 md:max-w-md">
              <Search
                size={16}
                className="shrink-0 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Search messages..."
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 outline-none"
              >
                <option value="all">All Subjects</option>
                <option value="project">Project</option>
                <option value="consultation">
                  Consultation
                </option>
                <option value="career">Career</option>
              </select>

              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
              >
                <FileDown size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-2xl bg-white/10"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-white/10 p-10 text-center">
              <p className="text-lg font-medium text-white">
                No messages found
              </p>

              <p className="mt-2 text-sm text-slate-400">
                New contact form submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">

                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="px-3 py-3">
                      Name
                    </th>

                    <th className="px-3 py-3">
                      Email
                    </th>

                    <th className="px-3 py-3">
                      Phone
                    </th>

                    <th className="px-3 py-3">
                      Subject
                    </th>

                    <th className="px-3 py-3">
                      Message
                    </th>

                    <th className="px-3 py-3">
                      Date
                    </th>

                    <th className="px-3 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b border-white/10 text-slate-200 transition hover:bg-white/[0.03]"
                    >
                      <td className="whitespace-nowrap px-3 py-3">
                        {message.name}
                      </td>

                      <td className="px-3 py-3">
                        <a
                          href={`mailto:${message.email}`}
                          className="text-cyan-300 hover:text-cyan-200"
                        >
                          {message.email}
                        </a>
                      </td>

                      <td className="whitespace-nowrap px-3 py-3">
                        <a
                          href={`tel:${message.phone}`}
                          className="text-slate-300 hover:text-cyan-300"
                        >
                          {message.phone}
                        </a>
                      </td>

                      <td className="whitespace-nowrap px-3 py-3">
                        {message.subject}
                      </td>

                      <td className="max-w-[220px] px-3 py-3">
                        <div className="truncate">
                          {message.message}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-3">
                        {new Date(
                          message.createdAt
                        ).toLocaleString()}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          {/* View */}
                          <button
                            onClick={() =>
                              setSelected(message)
                            }
                            title="View message"
                            className="rounded-full border border-cyan-400/20 bg-cyan-500/10 p-2 text-cyan-200 transition hover:bg-cyan-500/20"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              remove(message.id)
                            }
                            title="Delete message"
                            className="rounded-full border border-rose-400/20 bg-rose-500/10 p-2 text-rose-200 transition hover:bg-rose-500/20"
                          >
                            <Trash2 size={15} />
                          </button>
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

      {/* Message Modal */}
      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                  Inbox
                </p>

                <h3 className="mt-1 text-2xl font-semibold text-white">
                  Message Details
                </h3>
              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Name
                </p>

                <p className="mt-1 text-white">
                  {selected.name}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Email
                </p>

                <a
                  href={`mailto:${selected.email}`}
                  className="mt-1 block text-cyan-300 hover:text-cyan-200"
                >
                  {selected.email}
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Phone
                </p>

                <a
                  href={`tel:${selected.phone}`}
                  className="mt-1 block text-cyan-300 hover:text-cyan-200"
                >
                  {selected.phone}
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Subject
                </p>

                <p className="mt-1 text-white">
                  {selected.subject}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Date
                </p>

                <p className="mt-1 text-white">
                  {new Date(
                    selected.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Message
                </p>

                <p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-300">
                  {selected.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    `Re: ${selected.subject}`
                  )}`}
                  className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Reply by Email
                </a>

                <button
                  onClick={() =>
                    remove(selected.id)
                  }
                  className="rounded-full border border-rose-400/20 bg-rose-500/10 px-5 py-3 text-sm text-rose-200 transition hover:bg-rose-500/20"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}