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

async function readMessages() {
  if (!process.env.DATABASE_URL) {
    return readFallbackMessages();
  }

  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {
    return readFallbackMessages();
  }
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

    if (!token) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    verifyAdminToken(token);
    const data = await readMessages();

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
}
