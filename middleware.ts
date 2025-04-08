// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { auth } from "@/app/_lib/config/auth";
import { VIEW_PREFERENCES } from "@/app/_lib/constants/viewPreferences";

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

// Nuevo array para rutas de autenticación
const AUTH_PATHS = [
  "/auth/signin",
  "/auth/login",
  "/auth/signup",
  "/auth/register",
] as const;

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
  // IMPORTANTE: Usamos la URL actual como base para mantener el mismo dominio
  const newUrl = new URL(pathname, request.url);

  if (pathname === "/") {
    newUrl.pathname = `/${locale}`;
  } else {
    newUrl.pathname = `/${locale}${pathname}`;
  }

  // Mantener los parámetros de búsqueda
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
        maxAge: 60 * 60 * 24 * 365, // 1 año
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      return;
    } else {
      const lastTab = request.cookies.get("lastProjectTab")?.value;
      if (lastTab) {
        // IMPORTANTE: Mantener el mismo dominio para redirecciones
        const url = new URL(pathname, request.url);
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

// Función para verificar si una ruta es una ruta de autenticación
function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((path) => pathname.includes(path));
}

export default auth(async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Obtener el host actual para depuración
  const currentHost = request.headers.get("host") || "";

  // 1. Si es una ruta de auth API, permitir sin modificaciones
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Ignorar rutas que no necesitan procesamiento
  if (isIgnoredPath(pathname)) {
    return NextResponse.next();
  }

  // Obtener la sesión del usuario
  const session = await auth();

  // 3. Para rutas protegidas, verificar autenticación
  if (PROTECTED_PATHS.some((path) => pathname.includes(path))) {
    if (!session) {
      const locale = getPreferredLocale(request);
      // IMPORTANTE: Mantener el mismo host para la redirección
      const redirectUrl = new URL(`/${locale}/auth/signin`, request.url);
      redirectUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // NUEVO: Para rutas de autenticación, redirigir si el usuario ya está autenticado
  if (isAuthPath(pathname) && session) {
    const locale = getPreferredLocale(request);
    // Redirigir al dashboard si el usuario ya está logueado
    const redirectUrl = new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Si la ruta ya tiene un locale válido
  if (hasValidLocale(pathname)) {
    const response = NextResponse.next();

    // 5. Gestionar el estado de las tabs y obtener posible redirección
    const tabRedirect = preserveTabState(request, response);
    if (tabRedirect) {
      return tabRedirect;
    }

    // 6. Verificar y establecer preferencia de vista para rutas del dashboard
    if (pathname.includes("/dashboard")) {
      setDefaultViewPreference(request, response);
    }

    return response;
  }

  // 7. Para rutas sin locale, redirigir a la versión localizada
  const locale = getPreferredLocale(request);
  const localizedUrl = buildLocalizedUrl(request, locale);
  const response = NextResponse.redirect(localizedUrl);

  // 8. Establecer cookie de locale
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  // 9. Gestionar el estado de las tabs
  const tabRedirect = preserveTabState(request, response);
  if (tabRedirect) {
    return tabRedirect;
  }

  // 10. Establecer preferencia de vista si es necesario
  if (pathname.includes("/dashboard")) {
    setDefaultViewPreference(request, response);
  }

  return response;
});

export const config = {
  matcher: [
    // Skip archivos estáticos pero incluir /api/auth para protección de rutas
    "/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]*$).*)",
    "/",
  ],
};
