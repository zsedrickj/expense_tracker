import { NextResponse } from "next/server";
import DbConnnection from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await DbConnnection();

    const { email, password }: LoginRequestBody = await request.json();

    if (!email || !password) {
      return NextResponse.json( 
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // 🔍 Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // ✅ Login success
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
