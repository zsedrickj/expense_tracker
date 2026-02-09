// usecases/getDashboardTransactions.ts
import { Transaction } from "../types/transaction.types";

export const getDashboardTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch("/api/transactions", {
    method: "GET",
    credentials: "include", // send cookie along
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch transactions: ${res.status} ${res.statusText}`,
    );
  }

  return await res.json();
};
