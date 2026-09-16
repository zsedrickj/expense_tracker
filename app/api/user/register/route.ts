import { NextRequest, NextResponse } from "next/server";
import { register } from "@/services/auth.service";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp, isTrustedMutation } from "@/lib/requestSecurity";
import { sessionCookieOptions } from "@/lib/responseSecurity";

export async function POST(req: NextRequest) {
  if (!isTrustedMutation(req)) return NextResponse.json({ message: "Invalid request origin" }, { status: 403 });

  let body: { email?: unknown } & Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "invalid";
  const ip = getClientIp(req);
  if (!checkRateLimit(`register:ip:${ip}`, 3) || !checkRateLimit(`register:email:${email}`, 3)) {
    return NextResponse.json({ message: "Too many registration attempts. Try again later." }, { status: 429 });
  }

  try {
    const result = await register(body as never);
    const response = NextResponse.json({ message: "User registered successfully", user: result.user });
    response.cookies.set("token", result.token, sessionCookieOptions);
    return response;
  } catch (error: unknown) {
    const status = typeof error === "object" && error && "status" in error
      ? (error as { status?: number }).status
      : undefined;
    return NextResponse.json(
      { message: status === 409 ? "Unable to create account" : "Invalid registration request" },
      { status: status === 409 ? 409 : status === 400 ? 400 : 500 },
    );
  }
}
