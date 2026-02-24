"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryCardProps {
  name: string;
  type: "Income" | "Expense";
  color?: string; // bottom border accent color
  onEdit?: () => void;
  onDelete?: () => void;
}

const typeColorMap: Record<string, string> = {
  Income: "#22c55e",
  Expense: "#ef4444",
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  type,
  color,
  onEdit,
  onDelete,
}) => {
  const accentColor = color ?? typeColorMap[type] ?? "#6b7280";

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Top row: icon placeholder + name + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-gray-800 text-sm">{name}</p>
            <p className="text-xs text-gray-400">{type}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-150"
            aria-label="Edit category"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
            aria-label="Delete category"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Colored bottom accent bar */}
      <div
        className="h-1 rounded-full w-full"
        style={{ background: accentColor }}
      />
    </div>
  );
};

export default CategoryCard;
