/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getUserCategories } from "@/services/category.service";
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
    // 1️⃣ Get user from JWT cookie
    const user = getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Fetch categories for this user
    const categories = await getUserCategories(user.id);

    // 3️⃣ Return JSON
    return NextResponse.json(categories);
  } catch (err: any) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
