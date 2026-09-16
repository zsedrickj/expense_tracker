/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { fetchHorizontalData } from "@/usecases/getHorizontal";
import { useRefresh } from "@/app/(protected)/RefreshContext";

interface HorizontalChartItem {
  name: string;
  type: string;
  value: number;
  percent: number;
}

export const useHorizontalChart = () => {
  const [data, setData] = useState<HorizontalChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { reportKey } = useRefresh();

  const loadReport = async () => {
    try {
      setLoading(true);
      const result = await fetchHorizontalData();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [reportKey]);

  return { data, loading, error, refetch: loadReport };
};
