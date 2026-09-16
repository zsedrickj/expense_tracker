/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CircleDollarSign, TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useCurrency } from "@/app/(protected)/CurrencyContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { usePieChart } from "@/hooks/usePieChart";
import { formatCurrency } from "@/lib/currency";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function PieTooltip({ active, payload, currencyCode }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-popover-foreground">{item.name}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">
        {formatCurrency(item.value, currencyCode)} · {item.percent}%
      </p>
    </div>
  );
}

export function ChartPieLabel() {
  const { data, loading, error } = usePieChart();
  const { currency } = useCurrency();

  const totalExpenses = data.reduce((total, item) => total + item.value, 0);
  const chartConfig: ChartConfig = data.reduce((config, item, index) => {
    config[item.name] = {
      label: item.name,
      color: COLORS[index % COLORS.length],
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="flex h-full w-full flex-col overflow-hidden md:w-[45%]">
      <CardHeader className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
            <CircleDollarSign size={19} />
          </span>
          <div>
            <CardTitle className="text-base sm:text-lg">Expenses by Category</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">Where your money goes</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-5 py-5 sm:px-6">
        {loading && (
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            Loading expense breakdown...
          </div>
        )}

        {error && (
          <div className="flex h-72 items-center justify-center text-sm text-destructive">
            Failed to load expense breakdown: {error}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="flex h-72 flex-col items-center justify-center gap-2 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <CircleDollarSign size={22} />
            </span>
            <p className="text-sm font-medium text-foreground">No expense data yet</p>
            <p className="max-w-56 text-xs text-muted-foreground">
              Add an expense transaction to see your category breakdown.
            </p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="relative h-56 sm:h-64">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      cursor={false}
                      content={(props: any) => (
                        <PieTooltip {...props} currencyCode={currency.code} />
                      )}
                    />
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="62%"
                      outerRadius="88%"
                      paddingAngle={3}
                      stroke="var(--card)"
                      strokeWidth={2}
                    >
                      {data.map((item, index) => (
                        <Cell
                          key={`${item.name}-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total expenses
                </span>
                <span className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  {formatCurrency(totalExpenses, currency.code)}
                </span>
              </div>
            </div>

            <div className="grid max-h-44 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {data.map((item, index) => (
                <div
                  key={item.name}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-muted/45 px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="break-words text-sm font-medium leading-tight text-foreground">
                      {item.name}
                    </span>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {formatCurrency(item.value, currency.code)}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.percent}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t border-border px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="size-4 text-emerald-500" />
          Based on your recorded expenses
        </div>
      </CardFooter>
    </Card>
  );
}
