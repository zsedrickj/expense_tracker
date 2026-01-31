"use client";

import AddButton from "@/components/ui/addButton";

import { useModal } from "@/hooks/useModal";
import React from "react";
import TransactionTable from "./transactionTable";

const TransactionPage = () => {
  const { openAddTransaction } = useModal();

  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Transactions</h1>
          <p className="text-gray-500">Overview of your financial activity</p>
        </div>

        <AddButton name="Add Transaction" onClick={openAddTransaction} />
      </div>
      <TransactionTable />
    </div>
  );
};

export default TransactionPage;
