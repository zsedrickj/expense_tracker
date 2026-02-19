// src/app/api/transactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  createTransaction,
  getUserTransactions,
  getDashboardStats,
} from "@/services/transaction.service";
import { CreateTransactionDTO } from "@/types/transaction.types";
import jwt from "jsonwebtoken";

/** Helper: get userId from JWT cookie */
export async function getUserId(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return payload.id;
  } catch {
    return null;
  }
}

/** GET all transactions */
export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const transactions = await getUserTransactions(userId);
  return NextResponse.json(transactions);
}

/** POST create a new transaction */
export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: CreateTransactionDTO = await req.json();
  const transaction = await createTransaction(userId, body);
  return NextResponse.json(transaction, { status: 201 });
}

