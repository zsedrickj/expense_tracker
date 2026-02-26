/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { deleteCategory } from "@/usecases/deleteCategory";

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteCategory = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteCategory(id);

      return true;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDeleteCategory,
    loading,
    error,
  };
};
