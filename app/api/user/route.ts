/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUserBasicInfo } from "@/services/user.service";
import { getUserId } from "../transactions/route";

export async function GET(req: NextRequest) {
  try {
    // Example: kunin userId from header or token
    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await getLoggedInUserBasicInfo(userId);

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
