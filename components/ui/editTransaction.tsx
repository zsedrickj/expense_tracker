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
      onUpdate(updated); // ✅ update parent state instantly
      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Transaction has been successfully updated.",
        confirmButtonColor: "#10B981",
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Edit Transaction</h2>
          <X
            className="cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={onClose}
          />
        </div>
        <hr className="border-gray-200" />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 mt-1">
              Transaction ID: {transaction._id}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            {categoriesError && (
              <p className="text-red-500 text-sm">{categoriesError}</p>
            )}
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              disabled={categoriesLoading || categories.length === 0}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>
                {categoriesLoading ? "Loading..." : "Select Category"}
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="transactionDate"
              value={form.transactionDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors flex justify-center items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
