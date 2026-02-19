"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleData = [
  { name: "Food", percent: 43, amount: 1250 },
  { name: "Transportation", percent: 15, amount: 450 },
  { name: "Entertainment", percent: 13, amount: 380 },
  { name: "Utilities", percent: 10, amount: 290 },
  { name: "Health", percent: 6, amount: 180 },
  { name: "Education", percent: 5, amount: 150 },
  { name: "Other", percent: 8, amount: 234 },
];

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
  return (
    <div className="w-full md:w-[50%]">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5 p-10">
            {sampleData.map((item, index) => {
              const color = COLORS[index % COLORS.length];
              return (
                <div key={item.name} className="flex flex-col gap-1.5">
                  {/* Top row: dot + name + percent + amount */}
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
                        ₱{item.amount.toLocaleString()}.00
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
