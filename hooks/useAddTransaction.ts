/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { addTransaction as addTransactionAPI } from "@/usecases/addTransaction";

export interface TransactionForm {
  title: string;
  categoryId: string; // <-- match backend
  amount: number | "";
  transactionDate: string;
}

export const useAddTransaction = () => {
  // Modal visibility
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // Form state
  const [form, setForm] = useState<TransactionForm>({
    title: "",
    categoryId: "",
    amount: "",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      categoryId: "",
      amount: "",
      transactionDate: new Date().toISOString().split("T")[0],
    });
    setError("");
  };

  // Submit form
  const submitTransaction = async () => {
    if (!form.title || !form.categoryId || !form.amount) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await addTransactionAPI(form); // call your API
      resetForm();
      setShowAddTransaction(false);
      return response;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return {
    showAddTransaction,
    setShowAddTransaction,
    form,
    handleChange,
    resetForm,
    submitTransaction,
    loading,
    error,
  };
};
