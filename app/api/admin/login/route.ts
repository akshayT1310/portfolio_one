import { NextResponse } from 'next/server';
import { signAdminToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? '').trim();
    const password = String(body?.password ?? '').trim();

    const validEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.dev').trim();
    const validPassword = (process.env.ADMIN_PASSWORD || 'admin1234').trim();

    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json(
        { ok: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const token = signAdminToken({ sub: 'admin', email });

    return NextResponse.json({ ok: true, token });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { ok: false, message: 'Unable to log in right now.' },
      { status: 500 }
    );
  }
}
