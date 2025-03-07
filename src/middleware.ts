import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Create a response object
  const response = NextResponse.next();

  // You can add headers or other modifications here if needed
  // response.headers.set('x-custom-header', 'custom-value');

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|fonts|icons|images|favicon.ico|robots.txt).*)"],
};
