"use client";

import React from "react";
import AddButton from "@/components/ui/addButton";
import CategoryCard from "@/components/ui/categoryCard"; // adjust path as needed

// ── dummy data ──────────────────────────────────────────────────────────────
const incomeCategories = [
  { id: 1, name: "Salary", type: "Income" as const, color: "#22c55e" },
  { id: 2, name: "Freelance", type: "Income" as const, color: "#3b82f6" },
  { id: 3, name: "Investment", type: "Income" as const, color: "#a855f7" },
];

const expenseCategories = [
  { id: 4, name: "Food", type: "Expense" as const, color: "#ef4444" },
  { id: 5, name: "Transportation", type: "Expense" as const, color: "#f97316" },
  { id: 6, name: "Entertainment", type: "Expense" as const, color: "#ec4899" },
  { id: 7, name: "Utilities", type: "Expense" as const, color: "#6366f1" },
  { id: 8, name: "Health", type: "Expense" as const, color: "#14b8a6" },
  { id: 9, name: "Education", type: "Expense" as const, color: "#8b5cf6" },
  { id: 10, name: "Shopping", type: "Expense" as const, color: "#f59e0b" },
];
// ────────────────────────────────────────────────────────────────────────────

const CategoryPage = () => {
  const handleEdit = (id: number) => console.log("Edit", id);
  const handleDelete = (id: number) => console.log("Delete", id);

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto mb-10 m-auto max-w-350">
      {/* ── Header ── */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage your transaction categories</p>
        </div>
        <AddButton name="Add Category" />
      </div>

      {/* ── Income Categories ── */}
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
              key={cat.id}
              name={cat.name}
              type={cat.type}
              color={cat.color}
              onEdit={() => handleEdit(cat.id)}
              onDelete={() => handleDelete(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Expense Categories ── */}
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
              key={cat.id}
              name={cat.name}
              type={cat.type}
              color={cat.color}
              onEdit={() => handleEdit(cat.id)}
              onDelete={() => handleDelete(cat.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
