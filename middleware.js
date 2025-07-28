// middleware.js
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Only apply middleware to quiz routes
  if (request.nextUrl.pathname.startsWith("/quiz")) {
    try {
      // Check for session cookie instead of using Auth0's edge runtime
      const sessionCookie = request.cookies.get("appSession");

      if (!sessionCookie) {
        // Redirect to login if no session cookie
        return NextResponse.redirect(new URL("/api/auth/login", request.url));
      }

      // Basic validation - if cookie exists, assume user is authenticated
      // The actual validation will happen in the API routes
    } catch (error) {
      console.error("Middleware auth error:", error);
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quiz/:path*"],
};
