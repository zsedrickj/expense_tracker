import type { NextRequest } from "next/server";
import type { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/lib/jwt";

type TokenPayload = JwtPayload & { id?: string };

/** Returns a user id only when the signed session cookie is valid. */
export function getAuthenticatedUserId(req: NextRequest): string | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload || typeof payload === "string") return null;

  const userId = (payload as TokenPayload).id;
  return typeof userId === "string" ? userId : null;
}

/**
 * Browser requests that change data must originate from this application.
 * The optional public base URL supports deployments behind a reverse proxy.
 */
export function isTrustedMutation(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;

  const allowedOrigins = new Set([req.nextUrl.origin]);
  const publicBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (publicBaseUrl) {
    try {
      allowedOrigins.add(new URL(publicBaseUrl).origin);
    } catch {
      // An invalid optional deployment URL must never expand trusted origins.
    }
  }

  return allowedOrigins.has(origin);
}

export function getClientIp(req: NextRequest): string {
  // These headers must be overwritten by the deployment proxy, never forwarded
  // unchanged from the public internet. The email-based rate-limit key is an
  // additional guard when a host cannot guarantee that behavior.
  const forwarded = req.headers.get("x-forwarded-for");
  const forwardedIp = forwarded?.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") || forwardedIp || "unknown";
}
