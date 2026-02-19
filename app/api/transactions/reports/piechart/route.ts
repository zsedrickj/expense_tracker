import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getExpenseByCategory } from "@/services/transaction.service";
import { getUserId } from "../../route";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req); // palitan mo ng actual user id (auth later)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await getExpenseByCategory(userId);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch pie chart data" },
      { status: 500 },
    );
  }
}
