"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { usePieChart } from "@/hooks/usePieChart";

export function ChartPieLabel() {
  const { data, loading, error } = usePieChart();

  // Show loading or error states
  if (loading) return <div className="p-6">Loading chart...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!data || data.length === 0)
    return <div className="p-6 text-gray-500">No expense data found</div>;

  // Generate ChartConfig dynamically for colors
  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: `var(--chart-${(index % 5) + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col w-full md:w-[45%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-100">
          <ChartContainer config={chartConfig}>
            <PieChart width={"100%"} height={"100%"}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                label={({ name, index }) =>
                  `${name}: ${data[index]?.percent ?? 0}%`
                }
                outerRadius={110}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={`var(--chart-${(index % 5) + 1})`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Expense distribution by category
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on your recorded expenses
        </div>
      </CardFooter>
    </Card>
  );
}
