/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { fetchMonthlyReport } from "@/usecases/getBarChart";

interface MonthlyReport {
  month: string;
  income: number;
  expense: number;
}

export const useBarChart = () => {
  const [data, setData] = useState<MonthlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReport = async () => {
    try {
      setLoading(true);
      const result = await fetchMonthlyReport();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  return { data, loading, error, refetch: loadReport };
};
