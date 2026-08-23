import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { verifyAdminToken } from '@/lib/auth';

const prisma = new PrismaClient();
const fallbackPath = path.join(process.cwd(), 'data', 'messages.json');

function ensureFallback() {
  const dir = path.dirname(fallbackPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(fallbackPath)) fs.writeFileSync(fallbackPath, '[]', 'utf8');
}

function readFallbackMessages() {
  ensureFallback();
  try {
    const raw = fs.readFileSync(fallbackPath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

async function readStats() {
  if (!process.env.DATABASE_URL) {
    const messages = readFallbackMessages();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: messages.length,
      today: messages.filter((message: any) => new Date(message.createdAt) >= startOfDay).length,
      weekly: messages.filter((message: any) => new Date(message.createdAt) >= startOfWeek).length,
      monthly: messages.filter((message: any) => new Date(message.createdAt) >= startOfMonth).length,
    };
  }

  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - 6);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, today, weekly, monthly] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfMonth } } }),
    ]);

    return { total, today, weekly, monthly };
  } catch {
    return readStatsFromFallback();
  }
}

function readStatsFromFallback() {
  const messages = readFallbackMessages();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - 6);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  return {
    total: messages.length,
    today: messages.filter((message: any) => new Date(message.createdAt) >= startOfDay).length,
    weekly: messages.filter((message: any) => new Date(message.createdAt) >= startOfWeek).length,
    monthly: messages.filter((message: any) => new Date(message.createdAt) >= startOfMonth).length,
  };
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

    if (!token) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    verifyAdminToken(token);
    const data = await readStats();

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
}
