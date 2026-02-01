import { DashboardStat } from "@/entities/dashboardStats";

export const getDashboardStats = async (): Promise<DashboardStat[]> => {
  const res = await fetch("/api/transaction/stats"); // call your API route
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
};
