"use client";

import React from "react";
import { X } from "lucide-react";
import { useCategories } from "@/hooks/useCategories";
import {
  useEditTransaction,
  EditTransactionForm,
} from "@/hooks/useEditTransaction";
import { Transaction } from "@/types/transaction.types";
import Swal from "sweetalert2";

type EditTransactionProps = {
  transaction: Transaction;
  onClose: () => void;
  onUpdate: (updated: Transaction) => void;
};

const EditTransaction = ({
  transaction,
  onClose,
  onUpdate,
}: EditTransactionProps) => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const initialForm: EditTransactionForm = {
    title: transaction.title,
    categoryId: transaction.categoryId?._id || "",
    amount: transaction.amount,
    transactionDate: transaction.transactionDate
      ? new Date(transaction.transactionDate).toISOString().split("T")[0]
      : new Date(transaction.createdAt).toISOString().split("T")[0],
  };

  const { form, handleChange, submitEditTransaction, loading, error } =
    useEditTransaction(transaction._id, initialForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await submitEditTransaction();
    if (updated) {
      onUpdate(updated);
      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Transaction has been successfully updated.",
        confirmButtonColor: "#10B981",
      });
      onClose();
    }
  };

  const inputClass =
    "w-full p-3 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">
            Edit Transaction
          </h2>
          <X
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={onClose}
          />
        </div>
        <hr className="border-border" />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && <p className="text-destructive text-sm">{error}</p>}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
            />
            <span className="text-xs text-muted-foreground">
              Transaction ID: {transaction._id}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Category
            </label>
            {categoriesError && (
              <p className="text-destructive text-sm">{categoriesError}</p>
            )}
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              disabled={categoriesLoading || categories.length === 0}
              className={inputClass}
            >
              <option value="" disabled className="bg-card">
                {categoriesLoading ? "Loading..." : "Select Category"}
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id} className="bg-card">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              name="transactionDate"
              readOnly
              value={form.transactionDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors flex justify-center items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
