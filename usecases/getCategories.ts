/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@/types/category.types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch("/api/categories", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return data.map((cat: any) => ({
    id: cat._id.toString(), // make sure this is string version of ObjectId
    name: cat.name,
    type: cat.type,
  }));
};
