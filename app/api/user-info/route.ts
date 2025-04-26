import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "hono/jwt";
import { COOKIE_KEY } from "@/lib/keys";

export async function GET() {
  const token = (await cookies()).get(COOKIE_KEY)?.value;

  if (!token || !process.env.JWT_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  try {
    const payload = (await verify(token, process.env.JWT_SECRET)) as any;
    return NextResponse.json({
      name: payload.name,
      email: payload.email,
      role: payload.role,
    });
  } catch {
    return NextResponse.json({}, { status: 401 });
  }
}
