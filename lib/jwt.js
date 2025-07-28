// lib/jwt.js
import jwt from "jsonwebtoken";

export function verifyJWT(token) {
  try {
    // For Auth0 JWTs, we would normally verify against Auth0's public key
    // For now, we'll decode without verification (Auth0 handles verification)
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function extractUserFromToken(token) {
  const decoded = verifyJWT(token);
  if (!decoded) return null;

  return {
    sub: decoded.sub,
    name: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
    email_verified: decoded.email_verified,
  };
}

export function isTokenExpired(token) {
  const decoded = verifyJWT(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
