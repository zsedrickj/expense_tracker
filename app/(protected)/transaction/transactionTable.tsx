/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Search, Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useDashboardTable } from "@/hooks/useDashboardTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction"; // ✅
import EditTransaction from "@/components/ui/editTransaction";
import { Transaction } from "@/types/transaction.types";
import { useRefresh } from "@/app/(protected)/RefreshContext";
import Swal from "sweetalert2"; // ✅ SweetAlert2

type FilterButton = { name: string; value: string };

const filterButtons: FilterButton[] = [
  { name: "All", value: "all" },
  { name: "Income", value: "income" },
  { name: "Expense", value: "expense" },
];

const TransactionTable: React.FC = () => {
  const {
    search,
    setSearch,
    filteredTransactions: allTransactions,
    loading: tableLoading,
  } = useDashboardTable();

  const { refreshAll } = useRefresh();
  const { handleDeleteTransaction, loading: deleteLoading } =
    useDeleteTransaction();

  const [transactions, setTransactions] =
    useState<Transaction[]>(allTransactions);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setTransactions(allTransactions);
  }, [allTransactions]);

  const displayTransactions = useMemo(() => {
    let filtered = transactions;

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchLower),
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (t) => t.categoryId?.type?.toLowerCase() === activeFilter,
      );
    }

    return filtered;
  }, [transactions, debouncedSearch, activeFilter]);

  const handleTransactionUpdate = async (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t)),
    );

    refreshAll();
  };

  // ✅ DELETE HANDLER WITH SWEETALERT
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        // Optimistic UI update
        setTransactions((prev) => prev.filter((t) => t._id !== id));

        await handleDeleteTransaction(id);

        refreshAll();

        Swal.fire({
          title: "Deleted!",
          text: "Transaction has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Delete failed:", error);

        Swal.fire({
          title: "Error!",
          text: "Failed to delete transaction.",
          icon: "error",
        });

        refreshAll(); // fallback re-fetch
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search & Filters */}
      <div className="w-full rounded-2xl bg-white p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex w-full md:flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                activeFilter === btn.value
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "border-gray-300 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto p-10">
        {tableLoading && (
          <div className="text-center py-4 text-gray-500">
            Loading transactions...
          </div>
        )}

        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayTransactions.length > 0 ? (
              displayTransactions.map((item, index) => (
                <TableRow key={item._id ?? `transaction-${index}`}>
                  <TableCell className="font-bold">{item.title}</TableCell>
                  <TableCell>{item.categoryId?.name ?? "-"}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    <span
                      className={
                        item.categoryId?.type === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }
                    >
                      {item.amount}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() =>
                          setSelectedTransaction({
                            ...item,
                            _id: (item as any)._id || (item as any).id || "",
                          })
                        }
                        className="rounded-xl p-2 hover:bg-gray-200 transition"
                      >
                        <Edit2 size={20} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            (item as any)._id || (item as any).id || "",
                          )
                        }
                        disabled={deleteLoading}
                        className="rounded-xl p-2 hover:bg-gray-200 transition disabled:opacity-50"
                      >
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="empty row">
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      {selectedTransaction?._id && (
        <EditTransaction
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onUpdate={handleTransactionUpdate}
        />
      )}
    </div>
  );
};

export default TransactionTable;
