import { NextResponse } from "next/server";
import { COOKIE_KEY } from "@/lib/keys";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Delete the cookie at the server level
  response.cookies.delete(COOKIE_KEY);

  return response;
}
