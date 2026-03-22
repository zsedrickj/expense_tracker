/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getUserPreferredCurrency as fetchUserCurrency } from "@/usecases/getUserPreferredCurrency";

export function useUserPreferredCurrency() {
  const [currency, setCurrency] = useState<string>("PHP");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurrency() {
      try {
        setLoading(true);
        const userCurrency = await fetchUserCurrency();
        setCurrency(userCurrency);
      } catch (err: any) {
        setError(err.message || "Failed to fetch currency");
      } finally {
        setLoading(false);
      }
    }

    fetchCurrency();
  }, []);

  return { currency, setCurrency, loading, error };
}
