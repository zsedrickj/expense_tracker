/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getPieChart, PieChartData } from "@/usecases/getPieChart";

export const usePieChart = () => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getPieChart();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
