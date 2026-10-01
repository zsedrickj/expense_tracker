import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/auth.service";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp, isTrustedMutation } from "@/lib/requestSecurity";
import { sessionCookieOptions } from "@/lib/responseSecurity";

type LoginBody = {
  email?: unknown;
  password?: unknown;
  recaptchaToken?: unknown;
};

type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }

  const params = new URLSearchParams();

  params.append("secret", secretKey);
  params.append("response", token);

  if (ip) {
    params.append("remoteip", ip);
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "reCAPTCHA verification request failed:",
        response.status
      );

      return false;
    }

    const result = (await response.json()) as RecaptchaResponse;

    // Log verification result without exposing the actual token
    console.log("reCAPTCHA verification:", {
      success: result.success,
      score: result.score,
      action: result.action,
      hostname: result.hostname,
      errors: result["error-codes"],
    });

    // Google verification failed
    if (!result.success) {
      console.error(
        "reCAPTCHA verification failed:",
        result["error-codes"]
      );

      return false;
    }

    // Make sure the token was generated for the login action
    if (result.action !== "login") {
      console.error(
        "Invalid reCAPTCHA action:",
        result.action
      );

      return false;
    }

    // reCAPTCHA v3 score: 0.0 - 1.0
    if (
      typeof result.score !== "number" ||
      result.score < 0.5
    ) {
      console.error(
        "reCAPTCHA score too low:",
        result.score
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "reCAPTCHA verification error:",
      error
    );

    return false;
  }
}

export async function POST(req: NextRequest) {
  // Check request origin
  if (!isTrustedMutation(req)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 }
    );
  }

  // Parse request body
  let body: LoginBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validate and normalize email
  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "invalid";

  // Validate password
  const password =
    typeof body.password === "string"
      ? body.password
      : "";

  // Get reCAPTCHA token
  const recaptchaToken =
    typeof body.recaptchaToken === "string"
      ? body.recaptchaToken.trim()
      : "";

  // Get client IP
  const ip = getClientIp(req);

  // Rate limit login attempts
  if (
    !checkRateLimit(`login:ip:${ip}`) ||
    !checkRateLimit(`login:email:${email}`)
  ) {
    return NextResponse.json(
      {
        error:
          "Too many login attempts. Try again later.",
      },
      { status: 429 }
    );
  }

  // Require reCAPTCHA token
  if (!recaptchaToken) {
    return NextResponse.json(
      {
        error:
          "Security verification required.",
      },
      { status: 400 }
    );
  }

  // Verify reCAPTCHA with Google
  const recaptchaValid = await verifyRecaptcha(
    recaptchaToken,
    ip
  );

  if (!recaptchaValid) {
    return NextResponse.json(
      {
        error:
          "Security verification failed. Please try again.",
      },
      { status: 403 }
    );
  }

  try {
    // Verify email and password
    const result = await login({
      email,
      password,
    });

    // Create successful response
    const response = NextResponse.json({
      success: true,
      user: result.user,
    });

    // Set secure authentication cookie
    response.cookies.set(
      "token",
      result.token,
      sessionCookieOptions
    );

    return response;
  } catch (error: unknown) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error
        ? (error as { status?: number }).status
        : undefined;

    // Invalid email/password
    if (status === 401) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    // Validation error
    if (status === 400) {
      return NextResponse.json(
        {
          error: "Invalid login request",
        },
        { status: 400 }
      );
    }

    // Unexpected server error
    return NextResponse.json(
      {
        error: "Invalid login request",
      },
      { status: 500 }
    );
  }
}