"use client";

import React from "react";
import AddButton from "@/components/ui/addButton";
import DashboardTable from "@/components/ui/tables/dashboardTable/dashboardTable";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrency } from "../CurrencyContext";

export default function DashboardPage() {
  const isVerified = useAuthGuard();
  const { openAddTransaction } = useModal();
  const { stats, loading } = useDashboardStats();
  const { currency } = useCurrency();

  if (!isVerified) return null;

  const icons = [TrendingUp, TrendingDown, Wallet];
  const iconBgColors = ["bg-emerald-100/20", "bg-rose-100/20", "bg-sky-100/20"];
  const iconColors = ["text-emerald-500", "text-rose-500", "text-sky-500"];
  const percentColors = ["text-emerald-500", "text-rose-500", "text-sky-500"];

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto m-auto max-w-350">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your financial activity
          </p>
        </div>
        <AddButton name="Add Transaction" onClick={openAddTransaction} />
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loading && (
            <p className="text-muted-foreground text-sm col-span-3">
              Loading stats...
            </p>
          )}

          {!loading &&
            stats.map((item, index) => {
              const Icon = icons[index];
              const iconBg = iconBgColors[index];
              const iconColor = iconColors[index];
              const percentColor = percentColors[index];

              return (
                <div
                  key={index}
                  className="flex flex-col h-40 w-full p-5 gap-5 bg-card rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer border border-border"
                >
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg}`}
                    >
                      <Icon className={iconColor} />
                    </div>
                    <p className={`text-sm font-medium ${percentColor}`}>
                      {item.percent > 0 ? "+" : ""}
                      {item.percent}%
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      {item.title}
                    </p>
                    <h1 className="text-2xl font-semibold text-foreground">
                      {currency.symbol}
                      {item.amount.toLocaleString().split(" ")[0]}
                    </h1>
                  </div>
                </div>
              );
            })}
        </div>

        <DashboardTable />
      </div>
    </div>
  );
}
