/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/transaction/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "@/services/transaction.service";
import { UpdateTransactionDTO } from "@/types/transaction.types";
import jwt from "jsonwebtoken";

/** Helper: get userId from token */
async function getUserId(req: NextRequest): Promise<string | null> {
  // 1️⃣ Get token from cookie
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    // 2️⃣ Verify token and extract payload
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return payload.id;
  } catch (err) {
    // Invalid / expired token
    return null;
  }
}

/** GET /api/transaction/:id */
export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id)
    return NextResponse.json(
      { error: "Transaction ID required" },
      { status: 400 },
    );

  try {
    const transaction = await getTransactionById(id);
    if (!transaction)
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );

    // Optional: verify that transaction.userId === userId
    if (transaction.userId !== userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/** PUT /api/transaction/:id */
export async function PUT(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = req.nextUrl.pathname.split("/").pop();
    if (!id)
      return NextResponse.json(
        { error: "Transaction ID required" },
        { status: 400 },
      );

    const body: UpdateTransactionDTO = await req.json();

    // Validate required fields on backend
    if (
      !body.title ||
      !body.categoryId ||
      !body.amount ||
      !body.transactionDate
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const updated = await updateTransaction(id, body);

    if (!updated)
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );

    if (updated.userId !== userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PUT /api/transaction/:id error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update transaction" },
      { status: 400 },
    );
  }
}

/** DELETE /api/transaction/:id */
export async function DELETE(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id)
    return NextResponse.json(
      { error: "Transaction ID required" },
      { status: 400 },
    );

  try {
    // Optional: verify ownership before delete
    const transaction = await getTransactionById(id);
    if (!transaction)
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    if (transaction.userId !== userId)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const deleted = await deleteTransaction(id);
    return NextResponse.json(
      { success: deleted },
      { status: deleted ? 200 : 404 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
