// app/api/auth/check-token/route.ts
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json(
      { authenticated: true, user: payload },
      { status: 200 },
    );
  } catch (err) {
    console.error("Token check error:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
