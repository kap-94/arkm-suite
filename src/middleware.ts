import { NextRequest, NextResponse } from "next/server";

// Proper middleware implementation for Next.js 14+
export function middleware(request: NextRequest) {
  // Your middleware logic here
  return NextResponse.next();
}

// Keep your matcher configuration
export const config = {
  matcher: ["/((?!api|_next|fonts|icons|images|favicon.ico|robots.txt).*)"],
};
