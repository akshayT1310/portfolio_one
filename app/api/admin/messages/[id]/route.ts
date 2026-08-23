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

function writeFallbackMessages(messages: any[]) {
  ensureFallback();
  fs.writeFileSync(fallbackPath, JSON.stringify(messages, null, 2), 'utf8');
}

async function getMessage(id: string) {
  if (!process.env.DATABASE_URL) {
    return readFallbackMessages().find((message: any) => message.id === id) || null;
  }

  try {
    return await prisma.contactMessage.findUnique({ where: { id } });
  } catch {
    return readFallbackMessages().find((message: any) => message.id === id) || null;
  }
}

async function deleteMessage(id: string) {
  if (!process.env.DATABASE_URL) {
    const messages = readFallbackMessages().filter((message: any) => message.id !== id);
    writeFallbackMessages(messages);
    return true;
  }

  try {
    await prisma.contactMessage.delete({ where: { id } });
    return true;
  } catch {
    const messages = readFallbackMessages().filter((message: any) => message.id !== id);
    writeFallbackMessages(messages);
    return false;
  }
}

async function authorize(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

  if (!token) {
    throw new Error('Unauthorized');
  }

  verifyAdminToken(token);
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await authorize(req);
    const { id } = await params;
    const data = await getMessage(id);

    if (!data) {
      return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await authorize(req);
    const { id } = await params;
    await deleteMessage(id);
    return NextResponse.json({ ok: true, message: 'Deleted' });
  } catch {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
}
