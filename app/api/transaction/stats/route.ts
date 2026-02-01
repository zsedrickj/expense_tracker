/** GET dashboard stats */

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDashboardStats } from "@/services/transaction.service";

async function getUserId(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return payload.id;
  } catch {
    return null;
  }
}

// Optional: you could move this to a separate route like /api/dashboard/stats
export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stats = await getDashboardStats(userId);
  return NextResponse.json(stats);
}
