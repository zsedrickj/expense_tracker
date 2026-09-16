import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "@/services/user.service";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp, isTrustedMutation } from "@/lib/requestSecurity";

export async function POST(req: NextRequest) {
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  try {
    const { email } = await req.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "invalid";
    if (!checkRateLimit(`forgot:ip:${getClientIp(req)}`, 3) || !checkRateLimit(`forgot:email:${normalizedEmail}`, 3)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }
    await forgotPassword(normalizedEmail);
    return NextResponse.json({
      message: "If that email exists, a reset link was sent.",
    });
  } catch (error) {
    console.error("[forgot-password]", error);
    return NextResponse.json({ error: "Unable to process password reset request." }, { status: 400 });
  }
}
