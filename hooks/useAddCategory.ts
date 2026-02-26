/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useAddCategory.ts
import { useState } from "react";
import { addCategory } from "@/usecases/addCategory";
import { CreateCategoryDTO } from "@/types/category.types";

export const useAddCategory = (token?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const add = async (category: CreateCategoryDTO) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addCategory(category, token);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || "Failed to add category");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { add, loading, error, data };
};