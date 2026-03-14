import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/" || pathname.startsWith("/auth/login");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/transaction") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/settings");

  // WALANG TOKEN → redirect sa login ("/")
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // MAY TOKEN → verify JWT
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET); // ✅ throws if invalid/expired

      // MAY TOKEN pero nagpunta sa login page → redirect sa dashboard
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (err) {
      // INVALID o EXPIRED token → clear cookie + redirect sa login
      const res = NextResponse.redirect(new URL("/", req.url));
      res.cookies.delete("token"); // optional: clear expired token
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/dashboard/:path*",
    "/transaction/:path*",
    "/reports/:path*",
    "/categories/:path*",
    "/settings/:path*",
  ],
};
