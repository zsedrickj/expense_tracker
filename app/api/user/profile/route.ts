import { NextRequest, NextResponse } from "next/server";
import { updateLoggedInUserBasicInfo } from "@/services/user.service";
import { getUserId } from "../../transactions/route";

export async function PUT(req: NextRequest) {
  try {
    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fullname, email } = body;

    if (!fullname || !email) {
      return NextResponse.json(
        { error: "Fullname and email are required" },
        { status: 400 },
      );
    }

    const user = await updateLoggedInUserBasicInfo(userId, {
      fullname,
      email,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
