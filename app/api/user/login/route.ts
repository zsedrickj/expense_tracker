// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { login } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await login(body);

    const response = NextResponse.json({
      success: true,
      user: result.user,
    });

    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: error.status || 500 },
    );
  }
}
