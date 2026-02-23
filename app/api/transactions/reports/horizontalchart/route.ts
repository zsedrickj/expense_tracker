import { NextRequest, NextResponse } from "next/server";
import { getCategoryByTransaction } from "@/services/transaction.service";
import { getUserId } from "../../route";


export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const data = await getCategoryByTransaction(userId);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Category Transaction API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}