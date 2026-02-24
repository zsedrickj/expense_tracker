"use client";

import React from "react";
import { X } from "lucide-react";
import { useModal } from "@/hooks/useModal";

const AddCategory = () => {
  const { showAddCategory, closeAddCategory } = useModal();

  const [form, setForm] = React.useState({ name: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👇 IMPORTANT: Only render if open
  if (!showAddCategory) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md gap-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add Category</h2>

          {/* 👇 Close button works now */}
          <X
            onClick={closeAddCategory}
            className="cursor-pointer text-gray-500 hover:text-gray-800"
          />
        </div>

        <hr className="border-gray-200" />

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Groceries"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors"
          >
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
