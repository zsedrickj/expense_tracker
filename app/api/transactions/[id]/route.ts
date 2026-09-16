import { NextRequest, NextResponse } from "next/server";
import {
  deleteTransaction,
  getTransactionById,
  updateTransaction,
} from "@/services/transaction.service";
import { getAuthenticatedUserId, isTrustedMutation } from "@/lib/requestSecurity";
import type { UpdateTransactionDTO } from "@/types/transaction.types";

function getId(req: NextRequest) {
  return req.nextUrl.pathname.split("/").pop();
}

function isValidTransactionUpdate(body: UpdateTransactionDTO) {
  return (
    typeof body.title === "string" &&
    body.title.trim().length > 0 &&
    typeof body.categoryId === "string" &&
    body.categoryId.length > 0 &&
    typeof body.amount === "number" &&
    Number.isFinite(body.amount) &&
    body.amount >= 0 &&
    typeof body.transactionDate === "string" &&
    !Number.isNaN(Date.parse(body.transactionDate))
  );
}

export async function GET(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getId(req);
  if (!id) return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });

  try {
    const transaction = await getTransactionById(id, userId);
    if (!transaction) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    return NextResponse.json(transaction);
  } catch {
    return NextResponse.json({ error: "Unable to fetch transaction" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  const id = getId(req);
  if (!id) return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });

  let body: UpdateTransactionDTO;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!isValidTransactionUpdate(body)) {
    return NextResponse.json({ error: "Invalid transaction data" }, { status: 400 });
  }

  try {
    const updated = await updateTransaction(id, userId, body);
    if (!updated) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Unable to update transaction" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = getAuthenticatedUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  const id = getId(req);
  if (!id) return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });

  try {
    const deleted = await deleteTransaction(id, userId);
    if (!deleted) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete transaction" }, { status: 400 });
  }
}
