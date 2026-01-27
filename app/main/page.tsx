"use client";
import React, { useState } from "react";
import NavBar from "@/components/ui/navbar";
import DashboardPage from "@/pages/dashboardPage";
import AddTransaction from "@/components/ui/addTransaction";

const Dashboard = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false); // modal state

  return (
    <div className="h-screen w-screen bg-gray-100 lg:flex overflow-x-auto">
      {/* Navbar */}
      <NavBar isClosed={isClosed} setIsClosed={setIsClosed} />

      {/* Main Content */}
      <div className="flex-1 relative transition-all duration-300">
        {!isClosed && (
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[3px] z-10 pointer-events-none md:hidden"></div>
        )}

        {/* Dashboard content */}
        <DashboardPage setShowAddTransaction={setShowAddTransaction} />

        {/* Modal */}
        {showAddTransaction && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowAddTransaction(false)}
            ></div>

            {/* Modal content */}
            <div className="relative z-50 flex items-center">
              <AddTransaction showAddTransaction={showAddTransaction} setShowAddTransaction={setShowAddTransaction} />
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
