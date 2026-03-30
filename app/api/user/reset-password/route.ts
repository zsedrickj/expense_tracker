/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { resetPassword } from "@/services/user.service";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    await resetPassword(token, password);
    return NextResponse.json({ message: "Password reset successfully." });
  } catch (err: any) {
    console.error("[reset-password]", err);
    return NextResponse.json(
      { error: err.message || "Server error." },
      { status: 400 },
    );
  }
}
