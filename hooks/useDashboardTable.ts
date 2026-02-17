import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { getDashboardTransactions } from "@/usecases/getTransactions";
import { Transaction } from "@/types/transaction.types";
import { useRefresh } from "@/app/(protected)/RefreshContext"; // 👈

export const useDashboardTable = () => {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 400);
  const { transactionKey } = useRefresh(); // 👈

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboardTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, transactionKey]); // 👈 re-fetch pag nag-change ang transactionKey

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [transactions, debouncedSearch]);

  return {
    search,
    setSearch,
    filteredTransactions,
    loading,
  };
};
