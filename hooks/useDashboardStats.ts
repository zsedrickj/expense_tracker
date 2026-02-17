/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/usecases/getDashboardStats";
import { DashboardStat } from "@/types/dashboardStats";
import { useRefresh } from "@/app/(protected)/RefreshContext"; // 👈

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dashboardKey } = useRefresh(); // 👈

  useEffect(() => {
    setLoading(true);
    getDashboardStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [dashboardKey]); // 👈 re-fetch pag nag-change

  return { stats, loading, error };
};