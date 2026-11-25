import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  getExpectedAuthCookieValue,
  isSiteAuthConfigured,
  SITE_AUTH_COOKIE_NAME,
  SITE_AUTH_GATE_COOKIE_NAME,
} from '@/lib/requests/siteAuth';

export async function POST(request: Request) {
  if (!isSiteAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Site auth is not configured.' },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid body.' }, { status: 400 });
  }

  const submitted = body.password ?? '';
  const expected = process.env.SITE_ACCESS_PASSWORD ?? '';
  if (submitted !== expected) {
    return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
  }

  const token = await getExpectedAuthCookieValue();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Auth misconfigured.' }, { status: 503 });
  }

  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set(SITE_AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });

  cookieStore.delete(SITE_AUTH_GATE_COOKIE_NAME);

  return NextResponse.json({ ok: true });
}
