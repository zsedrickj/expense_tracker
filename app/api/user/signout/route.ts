import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  // Clear the cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    //for prod
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    maxAge: 0, // expire immediately
    path: "/",
  });

  return response;
}
