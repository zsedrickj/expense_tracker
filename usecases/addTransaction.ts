import { TransactionForm } from "@/hooks/useAddTransaction";

export const addTransaction = async (data: TransactionForm, token?: string) => {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: "include", // send cookie if using HttpOnly JWT
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Failed to add transaction");
  }

  return res.json();
};
