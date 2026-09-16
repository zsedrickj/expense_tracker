import { NextRequest, NextResponse } from "next/server";
import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";
import { getAuthenticatedUserId, isTrustedMutation } from "@/lib/requestSecurity";
import type { UpdateCategoryDTO } from "@/types/category.types";

function getId(req: NextRequest) {
  return req.nextUrl.pathname.split("/").pop();
}

export async function GET(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getId(req);
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  try {
    const category = await getCategoryById(id, userId);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Unable to fetch category" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  const id = getId(req);
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  let body: UpdateCategoryDTO;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (
    typeof body.name !== "string" ||
    !body.name.trim() ||
    (body.type !== undefined && body.type !== "income" && body.type !== "expense")
  ) {
    return NextResponse.json({ error: "Invalid category data" }, { status: 400 });
  }

  try {
    const updated = await updateCategory(id, userId, body);
    if (!updated) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Unable to update category" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  const id = getId(req);
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  try {
    const deleted = await deleteCategory(id, userId);
    if (!deleted) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete category" }, { status: 400 });
  }
}
