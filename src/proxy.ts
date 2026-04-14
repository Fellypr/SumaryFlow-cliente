import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_TOKEN_COOKIE_KEY,
  getAuthTokenFromCookies,
  isAuthTokenValid,
} from "./app/utils/authToken";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    const token = getAuthTokenFromCookies(request);
    if (!token) {
      return NextResponse.next();
    }
    if (isAuthTokenValid(token)) {
      return NextResponse.redirect(new URL("/sumary", request.url));
    }
    const response = NextResponse.next();
    response.cookies.delete(AUTH_TOKEN_COOKIE_KEY);
    return response;
  }

  const token = getAuthTokenFromCookies(request);
  if (!token || !isAuthTokenValid(token)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sumary", "/sumary/:path*"],
};
