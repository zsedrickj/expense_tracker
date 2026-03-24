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
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

import { useBarChart } from "@/hooks/useBarChart";
import { useTheme } from "@/app/(protected)/ThemeContext"; // adjust path if needed

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

function CustomTooltip({ active, payload, label, darkMode }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-lg shadow-lg px-3 py-2 text-sm border"
      style={{
        background: darkMode ? "oklch(0.22 0 0)" : "#ffffff",
        color: darkMode ? "oklch(0.93 0 0)" : "#111827",
        borderColor: darkMode ? "oklch(1 0 0 / 12%)" : "#e5e7eb",
      }}
    >
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-sm"
            style={{ background: p.fill }}
          />
          <span style={{ color: darkMode ? "oklch(0.65 0 0)" : "#6b7280" }}>
            {p.name}:
          </span>
          <span className="font-medium">
            ₱{Number(p.value).toLocaleString()}
          </span>
        </p>
      ))}
    </div>
  );
}

export function ChartBarMultiple() {
  const { data, loading, error } = useBarChart();
  const { darkMode } = useTheme();

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
    <Card className="flex flex-col w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg lg:text-xl">
          Monthly Financial Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="px-2 sm:px-4 lg:px-6">
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={data}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                barCategoryGap="30%"
                barGap={4}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke={darkMode ? "oklch(1 0 0 / 10%)" : "oklch(0 0 0 / 8%)"}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={false}
                  tick={{
                    fill: darkMode ? "oklch(0.65 0 0)" : "#6b7280",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) => value.slice(0, 3)}
                />

                <Tooltip
                  cursor={{
                    fill: darkMode ? "oklch(1 0 0 / 5%)" : "oklch(0 0 0 / 4%)",
                    radius: 4,
                  }}
                  content={(props: any) => (
                    <CustomTooltip {...props} darkMode={darkMode} />
                  )}
                />

                <Bar
                  dataKey="income"
                  fill={chartConfig.income.color}
                  radius={[4, 4, 0, 0]}
                  name={chartConfig.income.label}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="expense"
                  fill={chartConfig.expense.color}
                  radius={[4, 4, 0, 0]}
                  name={chartConfig.expense.label}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 text-xs sm:text-sm pt-2 px-4 sm:px-6">
        <div className="flex gap-2 leading-none font-medium items-center">
          Financial activity overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on your transaction history
        </div>
      </CardFooter>
    </Card>
  );
}
