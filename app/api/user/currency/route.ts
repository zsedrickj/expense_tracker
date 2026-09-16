import { NextRequest, NextResponse } from "next/server";
import {
  changeUserPreferredCurrency,
  getUserCurrency,
} from "@/services/user.service";
import { getUserId } from "@/app/api/transactions/route";
import { isTrustedMutation } from "@/lib/requestSecurity";

// GET → return preferredCurrency
export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currency = await getUserCurrency(userId);

    return NextResponse.json({ success: true, currency });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to fetch currency" },
      { status: 500 },
    );
  }
}

// POST → update preferredCurrency
export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!isTrustedMutation(req)) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    let currency: unknown;
    try {
      ({ currency } = await req.json());
    } catch {
      return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
    }
    if (typeof currency !== "string") {
      return NextResponse.json({ success: false, message: "Invalid currency" }, { status: 400 });
    }

    const result = await changeUserPreferredCurrency(userId, currency);

    return NextResponse.json({
      success: true,
      currency: result.user.preferredCurrency,
      rate: result.rate,
      rateDate: result.rateDate,
      convertedTransactions: result.convertedTransactions,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to update currency" },
      { status: 400 },
    );
  }
}
