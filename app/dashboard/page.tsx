"use client";
import AddButton from "@/components/ui/addButton";
import NavBar from "@/components/ui/navbar";
import React, { useState } from "react";

const Dashboard = () => {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className="h-screen w-screen bg-gray-100 lg:flex overflow-y-auto">
      {/* Navbar */}
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      {/* Main Content */}
      <div className={`flex-1 p-5 pt-20 transition-all duration-300 lg:px-20`}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
            <p>Overview of your financial activity</p>
          </div>
          <AddButton name="Add Transaction" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
