export interface DashboardStat {
  title: string;
  amount: number;
  percent: number;
  type: "income" | "expense" | "balance";
}
