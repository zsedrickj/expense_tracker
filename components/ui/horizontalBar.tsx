"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHorizontalChart } from "@/hooks/useHorizontalChart";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-1)",
  "var(--chart-2)",
];

export function ChartBarLabelCustom() {
  const { data, loading, error } = useHorizontalChart();

  return (
    <div className="w-full md:w-[50%]">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5 p-10">
            {loading && (
              <p className="text-sm text-muted-foreground">Loading report...</p>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            {!loading && !error && data.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No data available.
              </p>
            )}

            {!loading &&
              !error &&
              data.map((item, index) => {
                const color =
                  item.name === "Other"
                    ? "var(--muted-foreground)"
                    : COLORS[index % COLORS.length];

                return (
                  <div key={item.name} className="flex flex-col gap-1.5">
                    {/* Top row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          {item.percent}%
                        </span>
                        <span className="font-semibold text-foreground w-20 text-right">
                          ₱{item.value.toLocaleString()}.00
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
