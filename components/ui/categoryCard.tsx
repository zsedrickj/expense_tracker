"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface CategoryCardProps {
  name: string;
  type: "Income" | "Expense";
  color?: string;
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
    <div className="relative bg-card rounded-2xl shadow-sm border border-border p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-foreground text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-colors duration-150"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors duration-150"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <div
        className="h-1 rounded-full w-full"
        style={{ background: accentColor }}
      />
    </div>
  );
};

export default CategoryCard;
