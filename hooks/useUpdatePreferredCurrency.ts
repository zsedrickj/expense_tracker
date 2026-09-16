import { useState } from "react";
import {
  CurrencyConversionResult,
  updateUserPreferredCurrency as postCurrency,
} from "@/usecases/updateUserPreferredCurrency";

export function useUpdatePreferredCurrency() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCurrency = async (
    newCurrency: string,
  ): Promise<CurrencyConversionResult> => {
    try {
      setLoading(true);
      return await postCurrency(newCurrency);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update currency";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCurrency, loading, error };
}
