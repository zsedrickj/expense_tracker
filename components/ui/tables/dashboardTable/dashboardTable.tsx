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
import { useCurrency } from "@/app/(protected)/CurrencyContext";

const DashboardTable: React.FC = () => {
  const { search, setSearch, filteredTransactions } = useDashboardTable();
  const { currency } = useCurrency();

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-5 w-full max-h-full">
      <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Recent Transactions
          </h2>
          <p className="text-sm text-muted-foreground">
            Your latest financial activities
          </p>
        </div>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-3 py-2 border border-border rounded-lg bg-muted text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <hr className="border-border" />

      <div className="max-h-75 h-75 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Title</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item, index) => (
                <TableRow key={index} className="border-border">
                  <TableCell className="text-foreground">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    <div
                      className={
                        item.categoryId?.type === "income"
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }
                    >
                      {currency.symbol}
                      {item.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="empty-row">
                <TableCell
                  colSpan={2}
                  className="text-center py-6 text-muted-foreground"
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
