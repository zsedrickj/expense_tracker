/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import AddButton from "@/components/ui/addButton";
import CategoryCard from "@/components/ui/categoryCard";
import EditCategory from "@/components/ui/editCategory";
import { useModal } from "@/hooks/useModal";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category.types";
import { useRefresh } from "../RefreshContext";
import Swal from "sweetalert2";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";

const CategoryPage = () => {
  const { openAddCategory } = useModal();

  const { categories, loading, error, unauthorized, fetchCategories } =
    useCategories();
  const { dashboardKey } = useRefresh();
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [editing, setEditing] = useState(false);
  const {
    handleDeleteCategory,
    loading: deleting,
    error: deleteError,
  } = useDeleteCategory();
  useEffect(() => {
    fetchCategories();
  }, [dashboardKey, fetchCategories]);

  const incomeCategories = categories.filter(
    (cat: Category) => cat.type === "income",
  );

  const expenseCategories = categories.filter(
    (cat: Category) => cat.type === "expense",
  );

  if (unauthorized) return <p className="text-red-500">Unauthorized access.</p>;
  if (loading) return <p className="text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleDelete = async (_id: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const success = await handleDeleteCategory(_id); // ✅ use the hook's function
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category has been deleted.",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        fetchCategories(); // refresh your list
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error || "Could not delete the category.",
        });
      }
    }
  };

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto mb-10 m-auto max-w-350">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage your transaction categories</p>
        </div>

        <AddButton name="Add Category" onClick={openAddCategory} />
      </div>

      {/* Income */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          <h2 className="text-base font-semibold text-gray-700">
            Income Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {incomeCategories.map((cat) => (
            <CategoryCard
              key={cat._id}
              name={cat.name}
              type="Income"
              color="#22c55e"
              onEdit={() => {
                setSelectedCategory(cat); // i-set ang category na ie-edit
                setEditing(true); // i-show ang EditCategory modal
              }}
              onDelete={() => handleDelete(cat._id)}
            />
          ))}
        </div>
      </section>

      {/* Expense */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <h2 className="text-base font-semibold text-gray-700">
            Expense Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {expenseCategories.map((cat) => (
            <CategoryCard
              key={cat._id}
              name={cat.name}
              type="Expense"
              color="#ef4444"
              onEdit={() => {
                setSelectedCategory(cat); // ✅ important
                setEditing(true);
              }}
              onDelete={() => handleDelete(cat._id)}
            />
          ))}
        </div>
      </section>

      {/* ✅ Edit Modal */}
      {editing && selectedCategory && (
        <EditCategory
          category={selectedCategory}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
