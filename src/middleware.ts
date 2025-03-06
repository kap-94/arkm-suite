// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { VIEW_PREFERENCES } from "./lib/constants/viewPreferences";

const LOCALES = ["es", "en"] as const;
type ValidLocale = (typeof LOCALES)[number];
const defaultLocale: ValidLocale = "en";

const PUBLIC_PATHS = [
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
  "/assets",
] as const;

const IGNORED_PATHS = [
  "/_next",
  "/api/auth", // IMPORTANT: auth paths should be processed before /api
  "/api",
  "/static",
  "/images",
  "/fonts",
] as const;

const PROTECTED_PATHS = ["/dashboard", "/profile"] as const;

function isIgnoredPath(pathname: string): boolean {
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) return true;
  if (IGNORED_PATHS.some((path) => pathname.startsWith(path))) return true;
  if (pathname.includes(".")) return true;
  return false;
}

function getPreferredLocale(request: NextRequest): ValidLocale {
  try {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && LOCALES.includes(cookieLocale as ValidLocale)) {
      return cookieLocale as ValidLocale;
    }

    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      negotiatorHeaders[key] = value;
    });

    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();
    const preferredLocale = matchLocale(languages, LOCALES, defaultLocale);
    return preferredLocale as ValidLocale;
  } catch (error) {
    console.error("Error getting preferred locale:", error);
    return defaultLocale;
  }
}

function hasValidLocale(pathname: string): boolean {
  return LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

function buildLocalizedUrl(request: NextRequest, locale: ValidLocale): URL {
  const pathname = request.nextUrl.pathname;
  const newUrl = new URL(request.url);

  if (pathname === "/") {
    newUrl.pathname = `/${locale}`;
  } else {
    newUrl.pathname = `/${locale}${pathname}`;
  }

  newUrl.search = request.nextUrl.search;
  return newUrl;
}

function preserveTabState(
  request: NextRequest,
  response: NextResponse
): NextResponse | void {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  if (pathname.includes("/dashboard/project/")) {
    const currentTab = searchParams.get("tab");

    if (currentTab !== null) {
      response.cookies.set("lastProjectTab", currentTab, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return;
    } else {
      const lastTab = request.cookies.get("lastProjectTab")?.value;
      if (lastTab) {
        const url = new URL(request.url);
        url.searchParams.set("tab", lastTab);
        return NextResponse.redirect(url);
      }
    }
  }
}

function setDefaultViewPreference(
  request: NextRequest,
  response: NextResponse
): void {
  if (!request.cookies.has(VIEW_PREFERENCES.COOKIE_NAME)) {
    response.cookies.set(
      VIEW_PREFERENCES.COOKIE_NAME,
      VIEW_PREFERENCES.DEFAULT_VIEW,
      {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: VIEW_PREFERENCES.MAX_AGE,
      }
    );
  }
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Skip processing for /api/auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Ignore paths that don't require processing
  if (isIgnoredPath(pathname)) {
    return NextResponse.next();
  }

  // 3. For protected paths, verify authentication using getToken and pass the secret
  if (PROTECTED_PATHS.some((path) => pathname.includes(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
    if (!token) {
      const locale = getPreferredLocale(request);
      return NextResponse.redirect(
        new URL(
          `/${locale}/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
  }

  // 4. If the path already contains a valid locale, process custom logic
  if (hasValidLocale(pathname)) {
    const response = NextResponse.next();
    const tabRedirect = preserveTabState(request, response);
    if (tabRedirect) {
      return tabRedirect;
    }
    if (pathname.includes("/dashboard")) {
      setDefaultViewPreference(request, response);
    }
    return response;
  }

  // 5. For paths without a locale, build the localized URL and set the cookie
  const locale = getPreferredLocale(request);
  const localizedUrl = buildLocalizedUrl(request, locale);
  const response = NextResponse.redirect(localizedUrl);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  const tabRedirect = preserveTabState(request, response);
  if (tabRedirect) {
    return tabRedirect;
  }
  if (pathname.includes("/dashboard")) {
    setDefaultViewPreference(request, response);
  }
  return response;
}

// Use the Node.js runtime to ensure compatibility with Node APIs
export const config = {
  runtime: "nodejs",
  matcher: [
    // Skip static files but include all other routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]*$).*)",
    "/",
  ],
};
