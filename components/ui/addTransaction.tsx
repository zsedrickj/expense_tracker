"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface AddTransactionProps {
  showAddTransaction: boolean;
  setShowAddTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTransaction = ({
  showAddTransaction,
  setShowAddTransaction,
}: AddTransactionProps) => {
  const [transType, setTransType] = useState<"expense" | "income">("expense");

  if (!showAddTransaction) return null;

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

        <form className="flex flex-col gap-4">
          {/* Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Type</label>
            <div className="flex w-full gap-3 p-1  ">
              <button
                type="button"
                onClick={() => setTransType("expense")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all bg-gray-100 ${
                  transType === "expense"
                    ? "bg-red-500 text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setTransType("income")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  transType === "income"
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              placeholder="e.g. Grocery"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Select (FIXED) */}
          <div className="flex flex-col gap-2 ">
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              defaultValue=""
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="food">Food</option>
              <option value="transpo">Transportation</option>
              <option value="utilities">Utilities</option>
              <option value="salary">Salary</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
