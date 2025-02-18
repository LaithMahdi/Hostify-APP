import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "hono/jwt";
import { COOKIE_KEY } from "./lib/keys";

// Types for our JWT payload
interface JWTPayload {
  id: string;
  role: "OWNER" | "USER" | "ADMIN";
  exp?: number;
  iat?: number;
}

// Configuration for protected routes
const PROTECTED_ROUTES = ["/", "/management", "/rooms", "/equipment"];
const ADMIN_ROUTES = ["/management", "/admin"];

// Function to verify JWT token
async function verifyToken(token: string): Promise<JWTPayload | null> {
  if (!token) {
    console.error("❌ No token provided.");
    return null;
  }

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing from environment variables.");
    return null;
  }

  try {
    console.log("🔍 Verifying token...");
    const payload = (await verify(
      token,
      process.env.JWT_SECRET
    )) as unknown as JWTPayload;
    console.log("✅ Token verified:", payload);
    return payload;
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    return null;
  }
}

// Function to check if token is expired
function isTokenExpired(exp?: number): boolean {
  return !exp || Date.now() >= exp * 1000; // Convert seconds to milliseconds
}

// Main middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/login" ||
    pathname === "/sign-up"
  ) {
    return NextResponse.next();
  }

  // Get the token from the cookie using NextRequest
  const token = request.cookies.get(COOKIE_KEY)?.value;

  // If accessing a protected route
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    // If no token exists, redirect to login
    if (!token) {
      console.log("🔴 No token found, redirecting to login.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify the token
    const payload = await verifyToken(token);

    // If token is invalid or expired, clear cookie and redirect to login
    if (!payload || isTokenExpired(payload.exp)) {
      console.log("🔴 Invalid or expired token, redirecting to login.");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(COOKIE_KEY);
      return response;
    }

    // Check admin routes
    if (
      ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
      payload.role !== "ADMIN"
    ) {
      console.log(
        "🛑 Unauthorized access to admin route, redirecting to dashboard."
      );
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.id);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  // ✅ Prevent logged-in users from accessing /login and /sign-up
  if (token) {
    const payload = await verifyToken(token);
    if (payload && !isTokenExpired(payload.exp)) {
      if (pathname === "/login" || pathname === "/sign-up") {
        console.log("🔒 User already logged in, redirecting to dashboard.");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}
