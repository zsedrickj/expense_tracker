// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { register } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await register(body);

    const response = NextResponse.json({
      message: "User registered successfully",
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
      { message: error.message || "Server error" },
      { status: error.status || 500 },
    );
  }
}
