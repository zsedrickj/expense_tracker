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
  const { form, handleChange, submitEditCategory, loading, error } =
    useEditCategory(category._id, { name: category.name, type: category.type });
  const { refreshAll } = useRefresh();
  const [type, setType] = useState<"income" | "expense">(category.type);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "income" || value === "expense") setType(value);
  };

  const handleUpdate = async () => {
    const updated = await submitEditCategory();
    if (updated) {
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
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error || "Something went wrong.",
      });
    }
  };

  const inputClass =
    "w-full p-3 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Edit Category</h2>
          <X
            onClick={onClose}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          />
        </div>

        <hr className="border-border" />

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Groceries"
              className={inputClass}
              value={form.name}
              onChange={handleChange}
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled className="bg-card">
                Select Type
              </option>
              <option value="income" className="bg-card">
                Income
              </option>
              <option value="expense" className="bg-card">
                Expense
              </option>
            </select>
          </div>

          <button
            type="button"
            className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50"
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
