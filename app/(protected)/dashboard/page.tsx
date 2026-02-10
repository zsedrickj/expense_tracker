"use client";

import React from "react";
import AddButton from "@/components/ui/addButton";
import DashboardTable from "@/components/ui/tables/dashboardTable/dashboardTable";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function DashboardPage() {
  const isVerified = useAuthGuard();
  const { openAddTransaction } = useModal();
  const stats = useDashboardStats();

  if (!isVerified) return null;

  // Static icons for each card (assumes stats order: income, expense, balance)
  const icons = [TrendingUp, TrendingDown, Wallet];
  const iconBgColors = ["bg-emerald-100", "bg-rose-100", "bg-sky-100"];
  const iconColors = ["text-emerald-600", "text-rose-600", "text-sky-600"];
  const percentColors = ["text-emerald-500", "text-rose-500", "text-sky-500"];

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Overview of your financial activity</p>
        </div>
        <AddButton name="Add Transaction" onClick={openAddTransaction} />
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((item, index) => {
            const Icon = icons[index];
            const iconBg = iconBgColors[index];
            const iconColor = iconColors[index];
            const percentColor = percentColors[index];

            return (
              <div
                key={index}
                className="flex flex-col h-40 w-full p-5 gap-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer"
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
                  <p className="text-gray-500 text-sm">{item.title}</p>
                  <h1 className="text-2xl font-semibold">
                    {item.amount.toLocaleString().split(" ")[0]}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Table */}
        <DashboardTable />
      </div>
    </div>
  );
}
