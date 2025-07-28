// app/api/me/route.js
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

    // Fallback: Try to read session cookie directly
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("appSession");

    if (sessionCookie) {
      try {
        // Parse the session cookie (this is a simplified approach)
        const sessionData = JSON.parse(
          Buffer.from(sessionCookie.value.split(".")[1], "base64").toString()
        );

        if (sessionData.user) {
          return NextResponse.json({
            user: {
              sub: sessionData.user.sub,
              name: sessionData.user.name,
              email: sessionData.user.email,
              picture: sessionData.user.picture,
            },
          });
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
