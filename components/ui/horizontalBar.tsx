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

  // 🔥 Top 6 + Other logic
  const processedData = (() => {
    if (!data || data.length <= 7) return data;

    const sorted = [...data].sort((a, b) => b.value - a.value);

    const topSix = sorted.slice(0, 6);
    const remaining = sorted.slice(6);

    const otherTotal = remaining.reduce((sum, item) => sum + item.value, 0);

    const otherPercent = remaining.reduce((sum, item) => sum + item.percent, 0);

    return [
      ...topSix,
      {
        name: "Other",
        type: "mixed",
        value: otherTotal,
        percent: otherPercent,
      },
    ];
  })();

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

            {!loading &&
              !error &&
              processedData?.map((item, index) => {
                const color = COLORS[index % COLORS.length];

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
                        className="h-1.5 rounded-full"
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
