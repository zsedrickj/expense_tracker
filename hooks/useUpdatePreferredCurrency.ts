/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { updateUserPreferredCurrency as postCurrency } from "@/usecases/updateUserPreferredCurrency";

export function useUpdatePreferredCurrency() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCurrency = async (newCurrency: string) => {
    try {
      setLoading(true);
      const updated = await postCurrency(newCurrency);
      return updated; // returns updated currency
    } catch (err: any) {
      setError(err.message || "Failed to update currency");
      return newCurrency; // fallback
    } finally {
      setLoading(false);
    }
  };

  return { updateCurrency, loading, error };
}
