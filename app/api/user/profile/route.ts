import { NextRequest, NextResponse } from "next/server";
import { updateLoggedInUserBasicInfo } from "@/services/user.service";

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const { userId, fullname, email } = body;

  const user = await updateLoggedInUserBasicInfo(userId, {
    fullname,
    email,
  });

  return NextResponse.json(user);
}
