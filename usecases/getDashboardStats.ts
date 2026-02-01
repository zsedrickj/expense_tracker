import { DashboardStat } from "@/entities/dashboardStats";

export const getDashboardStats = async (): Promise<DashboardStat[]> => {
  return [
    {
      title: "Total Income",
      amount: 8450,
      percent: 12.5,
      type: "income",
    },
    {
      title: "Total Expenses",
      amount: 31202,
      percent: -5.2,
      type: "expense",
    },
    {
      title: "Balance",
      amount: 5330,
      percent: 7.3,
      type: "balance",
    },
  ];
};
