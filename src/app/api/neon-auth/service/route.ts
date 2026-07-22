import { NextResponse } from 'next/server';
import { NEON_AUTH_URL, neonSignIn, neonSignUp, neonGetSession, neonSignInSocial } from '@/lib/neon-auth';

export async function GET(request: Request) {
  try {
    const sessionData = await neonGetSession(
      request.headers.get('cookie') || '',
      request.headers.get('authorization') || ''
    );
    return NextResponse.json({
      user: sessionData?.user || null,
      session: sessionData?.session || null,
      neonAuthUrl: NEON_AUTH_URL,
    });
  } catch (err: any) {
    return NextResponse.json({ user: null, error: err.message, neonAuthUrl: NEON_AUTH_URL });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, email, password, name, provider, callbackURL } = body;
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  const applyCookies = (sourceHeaders: Headers, targetResponse: NextResponse) => {
    const setCookies = sourceHeaders.getSetCookie();
    for (const cookie of setCookies) {
      targetResponse.headers.append('Set-Cookie', cookie);
    }
  };

  try {
    if (action === 'sign-up') {
      const { data, headers } = await neonSignUp(email, password, name, origin);
      const response = NextResponse.json(data);
      applyCookies(headers, response);
      return response;
    } else if (action === 'sign-in') {
      const { data, headers } = await neonSignIn(email, password, origin);
      const response = NextResponse.json(data);
      applyCookies(headers, response);
      return response;
    } else if (action === 'sign-in-social') {
      const { data, headers } = await neonSignInSocial(provider || 'google', callbackURL || origin, origin);
      const response = NextResponse.json(data);
      applyCookies(headers, response);
      return response;
    } else if (action === 'sign-out') {
      const res = await fetch(`${NEON_AUTH_URL}/sign-out`, {
        method: 'POST',
        headers: {
          cookie: request.headers.get('cookie') || '',
          authorization: request.headers.get('authorization') || '',
        },
      });
      const data = await res.json().catch(() => ({}));
      const response = NextResponse.json(data);
      applyCookies(res.headers, response);
      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Neon Auth operation failed' }, { status: 400 });
  }
}
