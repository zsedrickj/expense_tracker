/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { updateTransaction as updateTransactionAPI } from "@/usecases/updateTransaction";

export interface EditTransactionForm {
  title: string;
  categoryId: string;
  amount: number | "";
  transactionDate: string;
}

export const useEditTransaction = (
  transactionId: string | undefined, // allow undefined to catch missing IDs
  initialData: EditTransactionForm,
) => {
  const [form, setForm] = useState<EditTransactionForm>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** Handle form input changes */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  /** Submit edited transaction */
  const submitEditTransaction = async () => {
    // 1️⃣ Ensure transaction ID exists
    if (!transactionId) {
      const msg = "Transaction ID is missing.";
      console.error("submitEditTransaction:", msg);
      setError(msg);
      return null;
    }

    // 2️⃣ Validate required fields
    if (
      !form.title ||
      !form.categoryId ||
      form.amount === "" ||
      form.amount === 0
    ) {
      const msg = "Please fill in all required fields.";
      setError(msg);
      return null;
    }

    setLoading(true);
    setError("");

    try {
      // 3️⃣ Call API
      console.log("Updating transaction", transactionId, form);
      const updated = await updateTransactionAPI(transactionId, form);
      return updated;
    } catch (err: any) {
      console.error("submitEditTransaction error:", err);
      setError(err?.message || "Failed to update transaction");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    submitEditTransaction,
    loading,
    error,
    setError,
  };
};
