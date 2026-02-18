import { NextRequest, NextResponse } from "next/server";
import { getMonthlyTotals } from "@/services/transaction.service";
import jwt from "jsonwebtoken";

async function getUserId(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return payload.id;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getMonthlyTotals(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch monthly report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report data" },
      { status: 500 }
    );
  }
}
