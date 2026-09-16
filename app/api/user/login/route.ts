import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/auth.service";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp, isTrustedMutation } from "@/lib/requestSecurity";
import { sessionCookieOptions } from "@/lib/responseSecurity";

export async function POST(req: NextRequest) {
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "invalid";
  const ip = getClientIp(req);
  if (!checkRateLimit(`login:ip:${ip}`) || !checkRateLimit(`login:email:${email}`)) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }

  try {
    const result = await login({ email, password: body.password as string });
    const response = NextResponse.json({ success: true, user: result.user });
    response.cookies.set("token", result.token, sessionCookieOptions);
    return response;
  } catch (error: unknown) {
    const status = typeof error === "object" && error && "status" in error
      ? (error as { status?: number }).status
      : undefined;
    if (status === 401) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    return NextResponse.json({ error: "Invalid login request" }, { status: status === 400 ? 400 : 500 });
  }
}
