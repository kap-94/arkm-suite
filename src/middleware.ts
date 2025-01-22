// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { auth } from "./config/auth";

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
  "/api/auth", // Importante: la ruta de auth debe ir antes que /api
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
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

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

function setDefaultViewPreference(
  request: NextRequest,
  response: NextResponse
): void {
  // Solo establecer si no existe en cookies ni como header
  if (
    !request.cookies.has("preferredView") &&
    !request.headers.get("x-preferred-view")
  ) {
    const defaultView = "list";
    response.cookies.set("preferredView", defaultView, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 año
    });
  }
}

export default auth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Si es una ruta de auth API, permitir sin modificaciones
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // . Ignora otras rutas que no necesitan procesamiento
  if (isIgnoredPath(pathname)) {
    return NextResponse.next();
  }

  // 3. Para rutas protegidas, verificar autenticación
  if (PROTECTED_PATHS.some((path) => pathname.includes(path))) {
    const session = await auth();
    if (!session) {
      const locale = getPreferredLocale(request);
      return NextResponse.redirect(
        new URL(
          `/${locale}/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
  }

  // 4. Si la ruta ya tiene un locale válido
  if (hasValidLocale(pathname)) {
    const response = NextResponse.next();

    // 5. Verificar y establecer preferencia de vista para rutas del dashboard
    if (
      pathname.includes("/dashboard") &&
      !request.cookies.has("preferredView")
    ) {
      setDefaultViewPreference(request, response);
    }

    return response;
  }

  // 6. Para rutas sin locale, redirigir a la versión localizada
  const locale = getPreferredLocale(request);
  const localizedUrl = buildLocalizedUrl(request, locale);
  const response = NextResponse.redirect(localizedUrl);

  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  // 7. Establecer preferencia de vista si es necesario
  if (
    pathname.includes("/dashboard") &&
    !request.cookies.has("preferredView")
  ) {
    setDefaultViewPreference(request, response);
  }

  return response;
});

export const config = {
  matcher: [
    // Excluye ciertos paths pero incluye /api/auth para poder proteger rutas
    "/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]*$).*)",
    "/",
  ],
};
