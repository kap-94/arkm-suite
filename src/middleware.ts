// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Usa la sintaxis export default necesaria para edge middleware
export default function middleware(request: NextRequest) {
  // Función mínima que solo deja pasar la solicitud
  return NextResponse.next();
}

// Configuración básica de matcher
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas de solicitud excepto:
     * 1. /api/* (rutas API)
     * 2. /_next/* (archivos Next.js internos)
     * 3. /fonts/* (si sirves fuentes estáticas)
     * 4. /icons/* (si sirves iconos estáticos)
     * 5. /images/* (si sirves imágenes estáticas)
     * 6. /favicon.ico, /robots.txt, etc.
     */
    "/((?!api|_next|fonts|icons|images|favicon.ico|robots.txt).*)",
  ],
};
