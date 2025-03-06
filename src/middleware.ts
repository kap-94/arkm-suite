// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Extremadamente simplificado para depuración
export function middleware(request: NextRequest) {
  console.log("Middleware ejecutándose");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[^/]*$).*)"],
};
