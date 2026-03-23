/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { X } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useAddCategory } from "@/hooks/useAddCategory";
import { CategoryType } from "@/types/category.types";
import Swal from "sweetalert2";
import { useRefresh } from "@/app/(protected)/RefreshContext";

const AddCategory = () => {
  const { showAddCategory, closeAddCategory } = useModal();
  const { add, loading } = useAddCategory();
  const { refreshAll } = useRefresh();

  const [form, setForm] = React.useState<{
    name: string;
    type: CategoryType | "";
  }>({
    name: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a category type.",
        confirmButtonColor: "#34d399",
      });
      return;
    }
    try {
      await add({ name: form.name, type: form.type });
      refreshAll();
      setForm({ name: "", type: "" });
      closeAddCategory();
      Swal.fire({
        icon: "success",
        title: "Category Added!",
        text: `"${form.name}" has been added successfully.`,
        confirmButtonColor: "#34d399",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err?.message || "Something went wrong.",
        confirmButtonColor: "#34d399",
      });
    }
  };

  if (!showAddCategory) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col p-6 bg-card rounded-2xl shadow-2xl w-full max-w-md gap-5 border border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Add Category</h2>
          <X
            onClick={closeAddCategory}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          />
        </div>

        <hr className="border-border" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Groceries"
              className="w-full p-3 border border-border rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-3 border border-border rounded-xl bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
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
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
