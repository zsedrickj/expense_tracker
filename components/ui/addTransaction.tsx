"use client";
import React from "react";
import { X } from "lucide-react";
import { useAddTransaction } from "@/hooks/useAddTransaction";
import { useCategories } from "@/hooks/useCategories";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface AddTransactionProps {
  showAddTransaction: boolean;
  setShowAddTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTransaction = ({
  showAddTransaction,
  setShowAddTransaction,
}: AddTransactionProps) => {
  const { form, handleChange, submitTransaction, loading, error } =
    useAddTransaction();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  if (!showAddTransaction) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await submitTransaction();

    if (response) {
      // SweetAlert success
      await MySwal.fire({
        icon: "success",
        title: "Transaction Added!",
        text: `Your transaction "${response.title}" has been saved.`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add Transaction</h2>
          <X
            className="cursor-pointer text-gray-500 hover:text-gray-800"
            onClick={() => setShowAddTransaction(false)}
          />
        </div>

        <hr className="border-gray-200" />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Grocery"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* Category */}
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
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              disabled={categoriesLoading || categories.length === 0}
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

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="transactionDate"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              value={form.transactionDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors flex justify-center items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Transaction"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
