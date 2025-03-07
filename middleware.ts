import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Este es el middleware más básico posible
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Configuración mínima
export const config = {
  matcher: ["/"],
};
