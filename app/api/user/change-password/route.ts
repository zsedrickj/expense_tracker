import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  changeLoggedInUserPassword,
  getLoggedInUserPassword,
} from "@/services/user.service";
import { getAuthenticatedUserId, isTrustedMutation } from "@/lib/requestSecurity";

export async function PUT(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  let body: { oldPassword?: unknown; newPassword?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.oldPassword !== "string" || typeof body.newPassword !== "string") {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (body.newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  try {
    const user = await getLoggedInUserPassword(userId);
    if (!(await bcrypt.compare(body.oldPassword, user.password))) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }
    if (await bcrypt.compare(body.newPassword, user.password)) {
      return NextResponse.json({ error: "New password must be different from current password" }, { status: 400 });
    }

    await changeLoggedInUserPassword(userId, await bcrypt.hash(body.newPassword, 12));
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return NextResponse.json({ error: "Unable to update password" }, { status: 500 });
  }
}
