// app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ await here
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json(
      { authenticated: true, user: payload },
      { status: 200 },
    );
  } catch (err) {
    console.error("Token verification error:", err);

    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
