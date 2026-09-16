import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/services/user.service";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp, isTrustedMutation } from "@/lib/requestSecurity";

export async function POST(req: NextRequest) {
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  try {
    const { token, password } = await req.json();
    if (!checkRateLimit(`reset:ip:${getClientIp(req)}`, 5)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }
    await resetPassword(token, password);
    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("[reset-password]", error);
    return NextResponse.json(
      { error: "Invalid or expired reset request." },
      { status: 400 },
    );
  }
}
