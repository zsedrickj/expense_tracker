import { NextRequest, NextResponse } from "next/server";
import { isTrustedMutation } from "@/lib/requestSecurity";
import { clearSessionCookie } from "@/lib/responseSecurity";

export async function POST(req: NextRequest) {
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  const response = NextResponse.json({ success: true, message: "Logged out" });
  clearSessionCookie(response);
  return response;
}
