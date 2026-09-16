import { NextRequest, NextResponse } from "next/server";
import { createCategory, getUserCategories } from "@/services/category.service";
import { getAuthenticatedUserId, isTrustedMutation } from "@/lib/requestSecurity";

export async function GET(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(await getUserCategories(userId));
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ message: "Invalid request origin" }, { status: 403 });

  let body: { name?: unknown; type?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body.name !== "string" ||
    !body.name.trim() ||
    body.name.trim().length > 80 ||
    (body.type !== "income" && body.type !== "expense")
  ) {
    return NextResponse.json({ message: "Invalid category data" }, { status: 400 });
  }

  try {
    const category = await createCategory(userId, { name: body.name.trim(), type: body.type });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json({ message: "Unable to create category" }, { status: 400 });
  }
}
