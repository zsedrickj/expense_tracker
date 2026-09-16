import { NextRequest, NextResponse } from "next/server";
import {
  createTransaction,
  getUserTransactions,
} from "@/services/transaction.service";
import type { CreateTransactionDTO } from "@/types/transaction.types";
import { getAuthenticatedUserId, isTrustedMutation } from "@/lib/requestSecurity";

export function getUserId(req: NextRequest) {
  return getAuthenticatedUserId(req);
}

export async function GET(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(await getUserTransactions(userId));
  } catch {
    return NextResponse.json({ error: "Unable to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isTrustedMutation(req)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  let body: CreateTransactionDTO;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body.title !== "string" ||
    !body.title.trim() ||
    typeof body.categoryId !== "string" ||
    typeof body.amount !== "number" ||
    !Number.isFinite(body.amount) ||
    body.amount < 0 ||
    typeof body.transactionDate !== "string" ||
    Number.isNaN(Date.parse(body.transactionDate))
  ) {
    return NextResponse.json({ error: "Invalid transaction data" }, { status: 400 });
  }

  try {
    const transaction = await createTransaction(userId, {
      ...body,
      title: body.title.trim(),
    });
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("POST /api/transactions error:", error);
    return NextResponse.json({ error: "Unable to create transaction" }, { status: 400 });
  }
}
