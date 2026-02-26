"use client";

import React, { useEffect } from "react";
import AddButton from "@/components/ui/addButton";
import CategoryCard from "@/components/ui/categoryCard";
import { useModal } from "@/hooks/useModal";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category.types";
import { useRefresh } from "../RefreshContext";

const CategoryPage = () => {
  const { openAddCategory } = useModal();
  const { categories, loading, error, unauthorized, fetchCategories } =
    useCategories();
  const { dashboardKey } = useRefresh();

  const handleEdit = (id: string) => console.log("Edit", id);
  const handleDelete = (id: string) => console.log("Delete", id);

  useEffect(() => {
    fetchCategories(); // re-fetch categories when key changes
  }, [dashboardKey, fetchCategories]);

  // Separate categories by type
  const incomeCategories = categories.filter(
    (cat: Category) => cat.type === "income",
  );
  const expenseCategories = categories.filter(
    (cat: Category) => cat.type === "expense",
  );

  if (unauthorized) return <p className="text-red-500">Unauthorized access.</p>;
  if (loading) return <p className="text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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

      {/* Income Categories */}
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
              type="Income" // Capitalized for CategoryCard
              color="#22c55e" // Always green for income
              onEdit={() => handleEdit(cat._id)}
              onDelete={() => handleDelete(cat._id)}
            />
          ))}
        </div>
      </section>

      {/* Expense Categories */}
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
              type="Expense" // Capitalized for CategoryCard
              color="#ef4444" // Always red for expense
              onEdit={() => handleEdit(cat._id)}
              onDelete={() => handleDelete(cat._id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
