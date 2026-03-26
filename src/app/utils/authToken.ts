import { destroyCookie, parseCookies } from "nookies";

export const AUTH_TOKEN_COOKIE_KEY = "auth.token";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64Payload)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getAuthTokenFromCookies(): string | undefined {
  return parseCookies()[AUTH_TOKEN_COOKIE_KEY];
}

export function isAuthTokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== "number") return false;
  return exp * 1000 > Date.now();
}

export function getUserIdFromToken(token: string): number | null {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  const raw =
    payload.nameid ??
    payload.sub ??
    payload[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  if (raw === undefined || raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function clearAuthTokenCookie(): void {
  destroyCookie(undefined, AUTH_TOKEN_COOKIE_KEY, { path: "/" });
}
