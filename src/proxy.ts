import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/console/dashboard', request.url));
  }

  if (pathname.startsWith('/console')) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;
    const isAuthenticated =
      token && secret ? await verifySessionToken(token, secret) : false;

    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
