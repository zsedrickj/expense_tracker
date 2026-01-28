"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useDashboardTable } from "@/hooks/useDashboardTable";

const DashboardTable: React.FC = () => {
  // ✅ useDashboardTable now manages its own data
  const { search, setSearch, filteredTransactions } = useDashboardTable();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-h-full">
      {/* Header */}
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Transactions
          </h2>
          <p className="text-sm text-gray-500">
            Your latest financial activities
          </p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <hr />
      {/* Table */}
      <div className="max-h-75 h-75 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      item.amount.startsWith("+")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {item.amount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center py-6 text-gray-500"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardTable;
