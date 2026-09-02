import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/session-constants";

// This runs on the Edge runtime, which cannot use Node's "crypto" module,
// so it only checks whether a session cookie is present (fast redirect for
// UX). The real, cryptographically-verified check happens server-side in
// src/app/admin/layout.tsx and in every admin API route via isAuthenticated()
// from lib/auth.ts (Node.js runtime) — so a forged/tampered cookie is still
// rejected even though middleware itself can't verify it.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
    if (!hasSessionCookie) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};