import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

const fallbackStoragePath = path.join(process.cwd(), 'data', 'messages.json');

function ensureFallbackStorage() {
  const dir = path.dirname(fallbackStoragePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(fallbackStoragePath)) {
    fs.writeFileSync(fallbackStoragePath, '[]', 'utf8');
  }
}

function readFallbackMessages() {
  ensureFallbackStorage();

  try {
    const raw = fs.readFileSync(fallbackStoragePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

function writeFallbackMessages(messages: Record<string, unknown>[]) {
  ensureFallbackStorage();
  fs.writeFileSync(fallbackStoragePath, JSON.stringify(messages, null, 2), 'utf8');
}

function sanitize(value: string) {
  return String(value).replace(/[<>]/g, '').trim();
}

function buildFallbackMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: sanitize(data.name),
    email: sanitize(data.email).toLowerCase(),
    phone: sanitize(data.phone),
    subject: sanitize(data.subject),
    message: sanitize(data.message),
    createdAt: new Date().toISOString(),
  };
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

async function saveContactMessage(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const payload = {
    name: sanitize(input.name),
    email: sanitize(input.email).toLowerCase(),
    phone: sanitize(input.phone),
    subject: sanitize(input.subject),
    message: sanitize(input.message),
  };

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured');
    }

    const contact = await prisma.contactMessage.create({
      data: payload,
    });

    return { source: 'db', data: contact };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (
      message.includes('DATABASE_URL') ||
      message.includes('Environment variable not found') ||
      message.includes('connect') ||
      message.includes('PrismaClientInitializationError')
    ) {
      const fallbackMessage = buildFallbackMessage(payload);
      const current = readFallbackMessages();
      current.unshift(fallbackMessage);
      writeFallbackMessages(current);

      return { source: 'fallback', data: fallbackMessage };
    }

    throw error;
  }
}

async function sendContactEmail(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  id: string;
}) {
  const resend = getResendClient();

  if (!resend) {
    return { sent: false, reason: 'RESEND_API_KEY is not configured' };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['takshaymain13@gmail.com'],
      replyTo: input.email,
      subject: `New Contact Message: ${input.subject}`,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 30px;
          background: #ffffff;
          color: #222;
        ">
          <h2 style="margin-bottom: 25px; color: #0891b2;">New Contact Form Submission</h2>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
            <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <h3>Message</h3>
            <div style="padding: 15px; background: #f8fafc; border-radius: 10px; white-space: pre-wrap; line-height: 1.6;">
              ${escapeHtml(input.message)}
            </div>
          </div>
          <p style="margin-top: 20px; color: #64748b; font-size: 13px;">Message ID: ${input.id}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { sent: false, reason: String(error) };
    }

    return { sent: true };
  } catch (error) {
    console.error('Resend email error:', error);
    return {
      sent: false,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: 'All fields are required.',
        },
        { status: 400 }
      );
    }

    const saved = await saveContactMessage({
      name: String(name),
      email: String(email),
      phone: String(phone),
      subject: String(subject),
      message: String(message),
    });

    const emailResult = await sendContactEmail({
      name: String(name),
      email: String(email),
      phone: String(phone),
      subject: String(subject),
      message: String(message),
      id: String(saved.data?.id ?? 'unknown'),
    });

    if (emailResult.sent) {
      return NextResponse.json({
        ok: true,
        message: 'Message sent successfully.',
        emailSent: true,
        id: saved.data?.id,
        source: saved.source,
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Message received successfully. Email notification could not be sent.',
      emailSent: false,
      id: saved.data?.id,
      source: saved.source,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      {
        ok: false,
        message: 'Unable to process your message right now.',
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}