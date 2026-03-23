"use client";
import React from "react";
import { X } from "lucide-react";
import { useAddTransaction } from "@/hooks/useAddTransaction";
import { useCategories } from "@/hooks/useCategories";
import { useModal } from "@/hooks/useModal";
import { useRefresh } from "@/app/(protected)/RefreshContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AddTransaction = () => {
  const { showAddTransaction, closeAddTransaction } = useModal();
  const { refreshAll } = useRefresh();
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
      await MySwal.fire({
        icon: "success",
        title: "Transaction Added!",
        text: `Your transaction "${response.title}" has been saved.`,
        timer: 2000,
        showConfirmButton: false,
      });
      refreshAll();
      closeAddTransaction();
    }
  };

  const inputClass =
    "w-full p-3 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Add Transaction</h2>
          <X
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={closeAddTransaction}
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
              placeholder="e.g. Grocery"
              className={inputClass}
              value={form.title}
              onChange={handleChange}
            />
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
              className={inputClass}
              disabled={categoriesLoading || categories.length === 0}
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
              placeholder="0.00"
              className={inputClass}
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <input
              type="date"
              name="transactionDate"
              className={inputClass}
              value={form.transactionDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors flex justify-center items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
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
