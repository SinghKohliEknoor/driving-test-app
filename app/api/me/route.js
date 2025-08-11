// app/api/me/route.js
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { extractUserFromToken, isTokenExpired } from "@/lib/jwt";

export async function GET(request) {
  try {
    // Try to get session using Auth0's method first
    const response = new NextResponse();
    const session = await getSession(request, response);

    if (session && session.user) {
      return NextResponse.json({
        user: {
          sub: session.user.sub,
          name: session.user.name,
          email: session.user.email,
          picture: session.user.picture,
          email_verified: session.user.email_verified,
        },
      });
    }

    // Enhanced fallback using JWT utilities
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("appSession");

    if (sessionCookie) {
      try {
        // Extract the JWT token from the session cookie
        const tokenParts = sessionCookie.value.split(".");
        if (tokenParts.length === 3) {
          const token = sessionCookie.value;

          // Check if token is expired
          if (isTokenExpired(token)) {
            console.log("Session token has expired");
            return NextResponse.json({ user: null });
          }

          // Extract user data using JWT utilities
          const userData = extractUserFromToken(token);
          if (userData) {
            return NextResponse.json({ user: userData });
          }
        }
      } catch (parseError) {
        console.log("Could not parse session cookie:", parseError.message);
      }
    }

    return NextResponse.json({ user: null });
  } catch (error) {
    console.error("Error in /api/me:", error);
    return NextResponse.json({ user: null });
  }
}
