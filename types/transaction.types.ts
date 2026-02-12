// types/transaction.types.ts

import { CategoryRef } from "./category.types";

/** Shared domain model (API response shape) */
export interface Transaction {
  _id: string;
  userId: string;
  categoryId: CategoryRef | null;
  title: string;
  amount: number;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDTO {
  categoryId: string;
  title?: string;
  amount: number;
  transactionDate: string;
}

export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;
