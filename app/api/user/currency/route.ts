/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  changeUserPreferredCurrency,
  getUserCurrency,
} from "@/services/user.service";
import { getUserId } from "@/app/api/transactions/route";

// GET → return preferredCurrency
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req); // replace with your auth logic
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currency = await getUserCurrency(userId);

    return NextResponse.json({ success: true, currency });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

// POST → update preferredCurrency
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req); // replace with your auth logic
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { currency } = await req.json();

    const updatedUser = await changeUserPreferredCurrency(userId, currency);

    return NextResponse.json({
      success: true,
      currency: updatedUser.preferredCurrency,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
