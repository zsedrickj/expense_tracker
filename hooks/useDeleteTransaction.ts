/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { deleteTransaction } from "@/usecases/deleteTransaction";

export const useDeleteTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteTransaction = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteTransaction(id);

      return true;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDeleteTransaction,
    loading,
    error,
  };
};
