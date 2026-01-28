import { useState, useEffect, useMemo } from "react";
import { Transaction } from "@/entities/transaction";
import { useDebounce } from "@/hooks/useDebounce";
import { getDashboardTransactions } from "@/usecases/getTransactions";

export const useDashboardTable = () => {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getDashboardTransactions();
      setTransactions(data);
    }
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [transactions, debouncedSearch]);

  return { search, setSearch, filteredTransactions };
};
