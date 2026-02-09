import { useEffect, useState } from "react";
import { getDashboardStats } from "@/usecases/getDashboardStats";
import { DashboardStat } from "@/types/dashboardStats";

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
  }, []);

  return stats;
};
