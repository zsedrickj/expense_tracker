import { NextRequest, NextResponse } from "next/server";
import { updateLoggedInUserBasicInfo } from "@/services/user.service";
import { getUserId } from "../../transactions/route";
import { isTrustedMutation } from "@/lib/requestSecurity";

export async function PUT(req: NextRequest) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isTrustedMutation(req)) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    let body: { fullname?: unknown; email?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const { fullname, email } = body;

    if (
      typeof fullname !== "string" ||
      typeof email !== "string" ||
      !fullname.trim() ||
      !/^\S+@\S+\.\S+$/.test(email.trim()) ||
      fullname.trim().length > 100 ||
      email.trim().length > 254
    ) {
      return NextResponse.json(
        { error: "Fullname and email are required" },
        { status: 400 },
      );
    }

    const user = await updateLoggedInUserBasicInfo(userId, {
      fullname: fullname.trim(),
      email: email.trim().toLowerCase(),
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
