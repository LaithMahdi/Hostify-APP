import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "hono/jwt";
import { COOKIE_KEY, JWT_SECRET } from "./lib/keys"; // adjust if needed

// Define your JWT payload
interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "USER" | "ADMIN";
  exp?: number;
  iat?: number;
}

// Routes that require login
const PROTECTED_ROUTES = [
  "/guest-house",
  "/guest",
  "/room",
  "/room/detail",
  "/equipment",
  "/dashboard",
];

// Admin-only routes
const ADMIN_ROUTES = ["/management", "/admin"];

// Verify the JWT token
async function verifyToken(token: string): Promise<JWTPayload | null> {
  if (!token) {
    console.error("❌ No token provided.");
    return null;
  }
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing.");
    return null;
  }

  try {
    console.log("🔍 Verifying token...");
    const payload = (await verify(token, JWT_SECRET)) as unknown as JWTPayload;
    console.log("✅ Token verified:", payload);
    return payload;
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    return null;
  }
}

// Check if token is expired
function isTokenExpired(exp?: number): boolean {
  return !exp || Date.now() >= exp * 1000; // exp is in seconds, need ms
}

// Main middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public or static routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/login" ||
    pathname === "/sign-up"
  ) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get(COOKIE_KEY)?.value;

  // For protected routes
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    // No token? Redirect to login
    if (!token) {
      console.log("🔴 No token found, redirecting to login.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyToken(token);

    // Invalid or expired token? Clear cookie and redirect
    if (!payload || isTokenExpired(payload.exp)) {
      console.log("🔴 Invalid or expired token, redirecting to login.");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(COOKIE_KEY);
      return response;
    }

    // Admin route check
    if (
      ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
      payload.role !== "ADMIN"
    ) {
      console.log(
        "🛑 Unauthorized access to admin route, redirecting to dashboard."
      );
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Token is valid — attach user info to headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.id);
    requestHeaders.set("x-user-name", payload.name);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // If user is already logged in and tries to access login or sign-up
  if (token) {
    const payload = await verifyToken(token);
    if (payload && !isTokenExpired(payload.exp)) {
      if (pathname === "/login" || pathname === "/sign-up") {
        console.log("🔒 User already logged in, redirecting to dashboard.");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  // Public route — continue
  return NextResponse.next();
}

// Config
export const config = {
  matcher: [
    /*
      Match all routes except:
      - static files (_next, static)
      - api routes
      - login & sign-up
    */
    "/((?!_next|static|api|login|sign-up).*)",
  ],
};
