"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { Category } from "@/types/category.types";
import { X } from "lucide-react";
import { useEditCategory } from "@/hooks/useEditCategory";
import { useRefresh } from "@/app/(protected)/RefreshContext";

interface EditCategoryProps {
  category: Category;
  onClose: () => void;
}

const EditCategory = ({ onClose, category }: EditCategoryProps) => {
  // Hook para sa form state
  const { form, handleChange, submitEditCategory, loading, error } =
    useEditCategory(category._id, { name: category.name });
  const { refreshAll } = useRefresh();
  const [type, setType] = useState<"income" | "expense">(category.type);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "income" || value === "expense") {
      setType(value);
    }
  };

  const handleUpdate = async () => {
    const updated = await submitEditCategory();

    if (updated) {
      // Optionally update type here if backend supports it
      console.log("Updated category:", { ...updated, type });

      // ✅ SweetAlert success
      await Swal.fire({
        icon: "success",
        title: "Category updated!",
        text: `Category "${form.name}" has been updated successfully.`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      refreshAll();
      onClose();
    } else {
      // ✅ SweetAlert error if something went wrong
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error || "Something went wrong while updating the category.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-white rounded-2xl shadow-2xl w-full max-w-md gap-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Edit Category</h2>
          <X
            onClick={onClose}
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Type</label>
            <select
              value={type}
              onChange={handleTypeChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <button
            type="button"
            className="mt-4 w-full py-3 bg-emerald-400 text-white rounded-xl font-bold hover:bg-emerald-300 transition-colors"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
