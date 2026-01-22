/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import DbConnection from "@/lib/mongodb";
import User from "@/models/user";

/* =========================
   REGISTER (POST)
========================= */
export async function POST(req: Request) {
  try {
    const { fullname, email, password } = await req.json();

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    await DbConnection();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

