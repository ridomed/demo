import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

const PRIVATE_PREFIXES = ["/dashboard", "/caisse", "/choose"];

function isPrivate(pathname: string) {
  return PRIVATE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // The localized marketing URL is authoritative for this request's language.
  // Clear any caller-supplied value before forwarding our internal header.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.delete("x-marketing-locale");
  const marketingLocale = pathname.slice(1);
  if (isLocale(marketingLocale)) {
    requestHeaders.set("x-marketing-locale", marketingLocale);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.cookies.set(LOCALE_COOKIE, marketingLocale, {
      path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax",
    });
    return response;
  }

  // /caisse and /choose live outside /dashboard but are still private,
  // authenticated areas — per-page permission checks run in their
  // layouts/pages.
  if (isPrivate(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // A logged-in user hitting /login goes to the post-login chooser.
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/choose", req.nextUrl));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
});

export const config = {
  matcher: [
    "/",
    "/ar",
    "/fr",
    "/en",
    "/dashboard/:path*",
    "/caisse",
    "/caisse/:path*",
    "/choose",
    "/login",
  ],
};
