/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditTransactionForm } from "@/hooks/useEditTransaction";

export const updateTransaction = async (
  id: string,
  data: EditTransactionForm,
) => {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    let responseData: any = {};
    try {
      responseData = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON from response", err);
    }

    console.log("updateTransaction API response:", res.status, responseData);

    if (!res.ok) {
      throw new Error(responseData.error || "Failed to update transaction");
    }

    return responseData;
  } catch (err: any) {
    console.error("updateTransaction error:", err);
    throw err;
  }
};
