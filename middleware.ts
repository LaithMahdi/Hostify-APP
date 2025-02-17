import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "hono/jwt";

// Types for our JWT payload
interface JWTPayload {
  id: string;
  role: "GUEST" | "USER" | "ADMIN";
  exp?: number;
  iat?: number;
}

// Configuration for protected routes
const PROTECTED_ROUTES = ["/dashboard", "/management", "/rooms", "/equipment"];

const ADMIN_ROUTES = ["/management", "/admin"];

// Function to verify JWT token
async function verifyToken(token: string): Promise<JWTPayload | null> {
  if (!token) return null;

  try {
    const payload = (await verify(
      token,
      process.env.JWT_SECRET as string
    )) as unknown as JWTPayload;
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Function to check if token is expired
function isTokenExpired(exp?: number): boolean {
  if (!exp) return true;
  return Date.now() >= exp * 1000;
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
    pathname === "/register"
  ) {
    return NextResponse.next();
  }

  // Get the token from the cookie
  const token = request.cookies.get(process.env.AUTH_COOKIE as string)?.value;

  // If accessing a protected route
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    // If no token exists, redirect to login
    if (!token) {
      const url = new URL("/login", request.url);
      //   url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Verify the token
    const payload = await verifyToken(token);

    // If token is invalid or expired, clear cookie and redirect to login
    if (!payload || isTokenExpired(payload.exp)) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(process.env.AUTH_COOKIE as string);
      return response;
    }

    // Check admin routes
    if (
      ADMIN_ROUTES.some((route) => pathname.startsWith(route)) &&
      payload.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.id);
    requestHeaders.set("x-user-role", payload.role);

    // Clone the request headers
    const response = NextResponse.next({
      headers: requestHeaders,
    });

    return response;
  }

  // For non-protected routes when user is logged in
  if (token) {
    const payload = await verifyToken(token);

    // If token is valid and user tries to access login/register
    if (
      payload &&
      !isTokenExpired(payload.exp) &&
      (pathname === "/login" || pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes should use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
