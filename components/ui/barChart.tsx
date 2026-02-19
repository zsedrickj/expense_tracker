/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useBarChart } from "@/hooks/useBarChart";

export const description = "A multiple bar chart";

const chartConfig = {
  income: {
    label: "Income",
    color: "green",
  },
  expense: {
    label: "Expenses",
    color: "red",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  const { data, loading, error } = useBarChart();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">Loading chart data...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-500">
          Failed to load chart: {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col space-y-6">
      <CardHeader>
        <CardTitle className="text-[20px] ">
          Monthly Financial Overview
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              {/* Custom Tooltip */}
              <Tooltip
                cursor={{ fill: "#e5e7eb" }}
                content={(props: any) => {
                  const { active, payload, label } = props;
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-200 p-2 rounded shadow">
                        <p className="font-semibold">{label}</p>
                        {payload.map((p: any) => (
                          <p key={p.dataKey} className="text-sm">
                            {p.name}: {p.value}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar
                dataKey="income"
                fill={chartConfig.income.color}
                radius={[4, 4, 0, 0]}
                name={chartConfig.income.label}
              />
              <Bar
                dataKey="expense"
                fill={chartConfig.expense.color}
                radius={[4, 4, 0, 0]}
                name={chartConfig.expense.label}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Financial activity overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on your transaction history
        </div>
      </CardFooter>
    </Card>
  );
}
