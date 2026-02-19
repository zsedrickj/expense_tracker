import { NextRequest, NextResponse } from "next/server";
import { getMonthlyTotals } from "@/services/transaction.service";
import jwt from "jsonwebtoken";
import { getUserId } from "../../route";


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
