/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { forgotPassword } from "@/services/user.service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await forgotPassword(email);
    return NextResponse.json({
      message: "If that email exists, a reset link was sent.",
    });
  } catch (err: any) {
    console.error("[forgot-password]", err);
    return NextResponse.json({ error: err.message || "Server error." }, { status: 400 });
  }
}