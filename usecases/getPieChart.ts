// api/getPieChart.ts

export interface PieChartData {
  name: string;
  value: number;
  percent: number;
}

export const getPieChart = async (): Promise<PieChartData[]> => {
  const res = await fetch("/api/transactions/reports/piechart");

  if (!res.ok) {
    throw new Error("Failed to fetch pie chart data");
  }

  return res.json();
};
