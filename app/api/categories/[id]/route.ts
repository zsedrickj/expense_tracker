/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "@/services/category.service";
import { UpdateCategoryDTO } from "@/types/category.types";
import jwt from "jsonwebtoken";

/** Helper: get userId from token */
async function getUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return payload.id;
  } catch {
    return null;
  }
}

/** GET /api/categories/:id */
export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  try {
    const category = await getCategoryById(id);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT /api/categories/:id */
export async function PUT(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  try {
    const body: UpdateCategoryDTO = await req.json();
    if (!body.name) return NextResponse.json({ error: "Category name is required" }, { status: 400 });

    const updated = await updateCategory(id, body);
    if (!updated) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/categories/:id error:", error);
    return NextResponse.json({ error: error.message || "Failed to update category" }, { status: 500 });
  }
}

/** DELETE /api/categories/:id */
export async function DELETE(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  try {
    const category = await getCategoryById(id);
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const deleted = await deleteCategory(id);
    return NextResponse.json({ success: deleted }, { status: deleted ? 200 : 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}