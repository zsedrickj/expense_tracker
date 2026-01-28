import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

  // ❌ WALANG TOKEN → redirect sa login ("/")
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ MAY TOKEN → bawal sa "/" at "/auth/login"
  if (token && isAuthPage) {
    // dito natin gagawin server-side default redirect sa lastPage kung may cookie
    // since localStorage hindi pwedeng basahin sa server, default sa /dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
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
