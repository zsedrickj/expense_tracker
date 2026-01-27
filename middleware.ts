import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

const protectedRoutes = [
  "/dashboard",
  "/transaction",
  "/reports",
  "/categories",
  "/settings",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
