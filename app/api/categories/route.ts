/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getUserCategories, createCategory } from "@/services/category.service";
import { verifyToken } from "@/lib/jwt";

/** Type for the decoded JWT payload */
interface CurrentUser {
  id: string;
  email: string;
}

/** Extract current user from request cookies (JWT) */
function getCurrentUser(req: NextRequest): CurrentUser | null {
  const cookie = req.cookies.get("token")?.value; // ✅ read from httpOnly cookie
  if (!cookie) return null;

  const decoded = verifyToken(cookie);
  if (!decoded) return null;

  return decoded as CurrentUser;
}

/** GET /api/categories */
export async function GET(req: NextRequest) {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const categories = await getUserCategories(user.id);
    return NextResponse.json(categories);
  } catch (err: any) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/** POST /api/categories */
export async function POST(req: NextRequest) {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, type } = body;

    // Validate name
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Invalid category name" },
        { status: 400 },
      );
    }

    // Validate type strictly against CategoryType
    if (type !== "income" && type !== "expense") {
      return NextResponse.json(
        { message: "Invalid category type" },
        { status: 400 },
      );
    }

    // Now TypeScript knows 'type' is CategoryType
    const newCategory = await createCategory(user.id, { name, type });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err: any) {
    console.error("Error creating category:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
