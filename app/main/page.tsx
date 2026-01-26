"use client";
import AddButton from "@/components/ui/addButton";
import NavBar from "@/components/ui/navbar";
import React, { useState } from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import DashboardTable from "@/components/ui/tables/dashboardTable/dashboardTable";
import DashboardPage from "@/pages/dashboardPage";

const Dashboard = () => {
  const [isClosed, setIsClosed] = useState(true);

  // 👉 example data
  const stats = [
    {
      title: "Total Income",
      amount: "$8,450.00",
      percent: "+12.5%",
      icon: TrendingUp,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      percentColor: "text-emerald-500",
    },
    {
      title: "Total Expenses",
      amount: "$3,120.00",
      percent: "-5.2%",
      icon: TrendingDown,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      percentColor: "text-rose-500",
    },
    {
      title: "Balance",
      amount: "$5,330.00",
      percent: "+7.3%",
      icon: Wallet,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      percentColor: "text-sky-500",
    },
  ];

  return (
    <div className="h-screen w-screen bg-gray-100 lg:flex overflow-x-auto">
      {/* Navbar */}
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      {/* Main Content */}
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
