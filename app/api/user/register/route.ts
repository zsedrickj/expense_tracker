/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import DbConnection from "@/lib/mongodb";
import User from "@/models/user";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { fullname, email, password } = await req.json();

    // Basic validation
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Connect to DB
    await DbConnection();

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate JWT for automatic login
    const token = generateToken({ id: user._id, email: user.email });

    // Return user info + JWT
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
        token, // <-- frontend will use this token for auth
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 },
    );
  }
}
