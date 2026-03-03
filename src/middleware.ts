import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect root "/" to "/en/forex"
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/en/forex";
    return NextResponse.redirect(url);
  }

  // Redirect "/en" or "/ar" (bare locale) to "/{locale}/forex"
  if (pathname === "/en" || pathname === "/ar") {
    const url = req.nextUrl.clone();
    url.pathname = `${pathname}/forex`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
