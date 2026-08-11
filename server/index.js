const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const xlsx = require('xlsx');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
require('jspdf-autotable');

const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const [key, ...rest] = line.split('=');
    const value = rest.join('=').trim();
    if (!process.env[key.trim()]) {
      process.env[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  }
}

const prisma = new PrismaClient();
const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20).regex(/^\+?[\d\s-]{7,15}$/),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000)
});

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

function sanitize(value) {
  return String(value).replace(/[<>]/g, '').trim();
}

const fallbackStoragePath = path.resolve(__dirname, '../data/messages.json');
function ensureFallbackStorage() {
  const dir = path.dirname(fallbackStoragePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(fallbackStoragePath)) fs.writeFileSync(fallbackStoragePath, '[]', 'utf8');
}
function readFallbackMessages() {
  ensureFallbackStorage();
  try {
    return JSON.parse(fs.readFileSync(fallbackStoragePath, 'utf8')) || [];
  } catch {
    return [];
  }
}
function writeFallbackMessages(messages) {
  ensureFallbackStorage();
  fs.writeFileSync(fallbackStoragePath, JSON.stringify(messages, null, 2), 'utf8');
}
function toFallbackMessage(data) {
  return {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: sanitize(data.name),
    email: sanitize(data.email).toLowerCase(),
    phone: sanitize(data.phone),
    subject: sanitize(data.subject),
    message: sanitize(data.message),
    createdAt: new Date().toISOString()
  };
}
async function saveContact(data) {
  const payload = {
    name: sanitize(data.name),
    email: sanitize(data.email).toLowerCase(),
    phone: sanitize(data.phone),
    subject: sanitize(data.subject),
    message: sanitize(data.message)
  };

  try {
    const saved = await prisma.contactMessage.create({
      data: {
        ...payload,
        email: payload.email
      }
    });
    return { source: 'db', data: saved };
  } catch (error) {
    const message = error?.message || String(error);
    if (message.includes('DATABASE_URL') || message.includes('Environment variable not found') || message.includes('connect')) {
      const fallbackMessage = toFallbackMessage(payload);
      const current = readFallbackMessages();
      current.unshift(fallbackMessage);
      writeFallbackMessages(current);
      return { source: 'fallback', data: fallbackMessage };
    }
    throw error;
  }
}
async function getAllMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {
    return readFallbackMessages();
  }
}
async function getMessageStats() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, today, weekly, monthly] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfMonth } } })
    ]);
    return { total, today, weekly, monthly };
  } catch {
    const messages = readFallbackMessages();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const filtered = messages.filter((message) => new Date(message.createdAt) >= startOfDay);
    const weeklyFiltered = messages.filter((message) => new Date(message.createdAt) >= startOfWeek);
    const monthlyFiltered = messages.filter((message) => new Date(message.createdAt) >= startOfMonth);
    return { total: messages.length, today: filtered.length, weekly: weeklyFiltered.length, monthly: monthlyFiltered.length };
  }
}
async function deleteMessage(id) {
  try {
    await prisma.contactMessage.delete({ where: { id } });
    return true;
  } catch {
    const messages = readFallbackMessages().filter((message) => message.id !== id);
    writeFallbackMessages(messages);
    return false;
  }
}

app.post('/api/contact', async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    }

    const result = await saveContact(parsed.data);
    return res.status(201).json({
      ok: true,
      message: 'Contact saved successfully',
      data: result.data,
      source: result.source
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const parsed = adminLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, message: 'Invalid credentials' });
    }
    const { email, password } = parsed.data;
    const valid = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
    if (!valid) {
      return res.status(401).json({ ok: false, message: 'Unauthorized' });
    }
    const token = jwt.sign({ sub: 'admin', email }, process.env.JWT_SECRET || 'portfolio-admin-secret', { expiresIn: '8h' });
    res.cookie('admin_token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    return res.json({ ok: true, token });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.admin_token;
  if (!token) return res.status(401).json({ ok: false, message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'portfolio-admin-secret');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }
}

app.get('/api/admin/messages', authMiddleware, async (req, res) => {
  const messages = await getAllMessages();
  return res.json({ ok: true, data: messages });
});

app.get('/api/admin/messages/stats', authMiddleware, async (req, res) => {
  const data = await getMessageStats();
  return res.json({ ok: true, data });
});

app.get('/api/admin/messages/:id', authMiddleware, async (req, res) => {
  const messages = await getAllMessages();
  const message = messages.find((entry) => entry.id === req.params.id);
  if (!message) return res.status(404).json({ ok: false, message: 'Not found' });
  return res.json({ ok: true, data: message });
});

app.delete('/api/admin/messages/:id', authMiddleware, async (req, res) => {
  await deleteMessage(req.params.id);
  return res.json({ ok: true, message: 'Deleted' });
});

app.get('/api/admin/export/:type', authMiddleware, async (req, res) => {
  const messages = await getAllMessages();
  if (req.params.type === 'csv') {
    const csv = messages.map((m) => [m.name, m.email, m.phone, m.subject, m.message, (m.createdAt || new Date().toISOString()).toString()].join(','));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="messages.csv"');
    return res.send(['name,email,phone,subject,message,createdAt', ...csv].join('\n'));
  }
  if (req.params.type === 'excel') {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(messages.map((m) => ({ ...m, createdAt: (m.createdAt || new Date().toISOString()).toString() })));
    xlsx.utils.book_append_sheet(wb, ws, 'Messages');
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="messages.xlsx"');
    return res.end(buffer);
  }
  if (req.params.type === 'pdf') {
    const doc = new jsPDF();
    doc.text('Contact Messages', 14, 14);
    const rows = messages.map((m) => [m.name, m.email, m.phone, m.subject, m.message, (m.createdAt || new Date().toISOString()).toString()]);
    doc.autoTable({ head: [['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date']], body: rows });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="messages.pdf"');
    return res.end(Buffer.from(doc.output('arraybuffer')));
  }
  return res.status(400).json({ ok: false, message: 'Unsupported export type' });
});

app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
