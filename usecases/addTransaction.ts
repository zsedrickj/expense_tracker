import { TransactionForm } from "@/hooks/useAddTransaction";

export const addTransaction = async (data: TransactionForm, token?: string) => {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  // Read text first
  const text = await res.text();

  // If the response is not ok, throw an error
  if (!res.ok) {
    const err = text ? JSON.parse(text) : { error: `Status ${res.status}` };
    throw new Error(err?.error || `Failed to add transaction`);
  }

  // Return parsed JSON if available, otherwise null
  return text ? JSON.parse(text) : null;
};
