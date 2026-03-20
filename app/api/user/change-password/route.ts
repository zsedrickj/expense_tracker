/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  changeLoggedInUserPassword,
  getLoggedInUserPassword,
} from "@/services/user.service";

// 🔹 Get userId from cookie token
async function getUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return payload.id;
  } catch (err) {
    return null;
  }
}

export async function PUT(req: NextRequest) {
  try {
    // 1️⃣ Get userId from JWT cookie
    const userId = await getUserId(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 2️⃣ Parse request body
    const body = await req.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // 3️⃣ Get current password from service
    const user = await getLoggedInUserPassword(userId);

    // 4️⃣ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 400 },
      );
    }

    // 5️⃣ Prevent same password reuse
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 },
      );
    }

    // 6️⃣ Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // 7️⃣ Update password via service
    await changeLoggedInUserPassword(userId, hashed);

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
