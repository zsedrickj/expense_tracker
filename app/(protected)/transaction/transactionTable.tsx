"use client";

import React from "react";
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

type FilterButton = {
  name: string;
  value: string;
};

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
  } = useDashboardTable();
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  const debouncedSearch = useDebounce(search, 500);

  // Compute filtered transactions on render (no useEffect needed)
  const displayTransactions = React.useMemo(() => {
    let filtered = allTransactions;

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
  }, [allTransactions, debouncedSearch, activeFilter]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search & Filters */}
      <div className="w-full rounded-2xl bg-white p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Bar */}
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

        {/* Filter Buttons */}
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

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto p-10">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow className="text-left">
              <TableHead className="min-w-37.5">Title</TableHead>
              <TableHead className="min-w-30">Category</TableHead>
              <TableHead className="min-w-30">Date</TableHead>
              <TableHead className="min-w-25 text-right">Amount</TableHead>
              <TableHead className="min-w-37.5 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayTransactions.length > 0 ? (
              displayTransactions.map((item, index) => (
                <TableRow key={item._id ?? index}>
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
                      <button className="flex items-center gap-1 rounded-xl px-3 py-1 text-black text-sm hover:bg-gray-200 transition">
                        <Edit2 size={20} />
                      </button>
                      <button className="flex items-center gap-1 rounded-xl px-3 py-1 hover:bg-gray-200 transition">
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="empty-row">
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
    </div>
  );
};

export default TransactionTable;
