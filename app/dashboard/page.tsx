"use client";
import AddButton from "@/components/ui/addButton";
import NavBar from "@/components/ui/navbar";
import React, { useState } from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import DashboardTable from "@/components/ui/tables/dashboardTable/dashboardTable";

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
      <div className="flex-1 p-5 pt-20 transition-all duration-300 lg:px-20">
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Overview of your financial activity</p>
          </div>
          <AddButton name="Add Transaction" />
        </div>
        <div className="flex flex-col gap-10 ">
          {/* Stat Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col h-40 w-full p-5 gap-5 bg-white rounded-2xl shadow-lg"
                >
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.iconBg}`}
                    >
                      <Icon className={item.iconColor} />
                    </div>
                    <p className={`text-sm font-medium ${item.percentColor}`}>
                      {item.percent}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">{item.title}</p>
                    <h1 className="text-2xl font-semibold">{item.amount}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <DashboardTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
