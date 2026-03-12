import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { changeLoggedInUserPassword } from "@/services/user.service";

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const { userId, newPassword } = body;

  const hashed = await bcrypt.hash(newPassword, 10);

  await changeLoggedInUserPassword(userId, hashed);

  return NextResponse.json({ message: "Password updated" });
}
