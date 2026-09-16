import type { NextResponse } from "next/server";

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
};

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set("token", "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
}
