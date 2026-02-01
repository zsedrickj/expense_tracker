// src/usecases/getCategories.ts
import { Category } from "@/entities/category";

export const getCategories = async (): Promise<Category[]> => {
  return [
    { id: 1, name: "Food", type: "expense" },
    { id: 2, name: "Transport", type: "expense" },
    { id: 3, name: "Utilities", type: "expense" },
    { id: 4, name: "Freelance", type: "income" },
    { id: 5, name: "Salary", type: "income" },
    { id: 6, name: "Investment", type: "income" },
  ];
};
