/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useCallback } from "react";
import { Category } from "@/types/category.types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  // ✅ define fetchCategories with useCallback so it can be reused
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUnauthorized(false);

    try {
      const res = await fetch("/api/categories", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ fetch on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, unauthorized, fetchCategories };
};
