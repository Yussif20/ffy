import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Minimal middleware – no next-intl to avoid Vercel deploy issues (e.g. middleware.js.nft.json).
 * All routes redirect to / so the app only shows the Coming Soon page (app/page.tsx).
 * Locale routes (app/[locale]/...) are commented out of use for now.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Show Coming Soon at root only – redirect everything else to /
  if (pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
