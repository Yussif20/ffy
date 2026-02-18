import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Supported locales
const locales = ["en", "ar"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Static files like .png, .css, .js, etc.
  ) {
    return NextResponse.next();
  }

  // Check if the path is already a coming-soon page (forex or futures)
  const isComingSoonPage = locales.some(
    (locale) =>
      pathname === `/${locale}/coming-soon` ||
      pathname === `/${locale}/futures/coming-soon` ||
      pathname === "/coming-soon" ||
      pathname === "/futures/coming-soon"
  );

  if (isComingSoonPage) {
    return NextResponse.next();
  }

  // Extract locale from path if present
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = pathnameLocale || defaultLocale;

  // Check if path is futures
  const isFutures =
    pathname.includes("/futures") ||
    pathname.startsWith(`/${locale}/futures`);

  // Redirect all other routes to coming-soon page
  const url = request.nextUrl.clone();
  url.pathname = isFutures
    ? `/${locale}/futures/coming-soon`
    : `/${locale}/coming-soon`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
