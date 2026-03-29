import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthTokenFromCookies, isAuthTokenValid } from './app/utils/authToken';

export function proxy(request: NextRequest) {
  const token = getAuthTokenFromCookies(request);

  if (!token || !isAuthTokenValid(token)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/summary',
};
