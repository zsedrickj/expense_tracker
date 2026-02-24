"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

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

  if (loading) return <div className="p-6">Loading chart...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const chartConfig: ChartConfig =
    data && data.length > 0
      ? data.reduce((acc, item, index) => {
          acc[item.name] = {
            label: item.name,
            color: `var(--chart-${(index % 5) + 1})`,
          };
          return acc;
        }, {} as ChartConfig)
      : {
          placeholder: { label: "No data", color: "var(--muted-foreground)" },
        };

  return (
    <Card className="flex flex-col w-full md:w-[45%]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
          {data && data.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />

                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="80%"
                    label={({ name, index }) =>
                      `${name}: ${data[index]?.percent ?? 0}%`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={`var(--chart-${(index % 5) + 1})`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No expense data found
            </div>
          )}
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
