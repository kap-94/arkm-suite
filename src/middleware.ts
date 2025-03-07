import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Create a response object
  const response = NextResponse.next();

  // You can add headers or other modifications here if needed
  // response.headers.set('x-custom-header', 'custom-value');

  return response;
}

export const config = {
  matcher: [
    // Apply middleware only to these paths
    "/",
    "/dashboard",
    // Add other paths as needed
  ],
};
