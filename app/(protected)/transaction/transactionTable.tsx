import React from "react";
import { Search } from "lucide-react";

type FilterButton = {
  name: string;
  value: string;
};

const filterButtons: FilterButton[] = [
  { name: "All ", value: "all" },
  { name: "Income", value: "income" },
  { name: "Expense", value: "expense" },
];

const TransactionTable = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full rounded-2xl bg-white p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search Bar */}
          <div className="relative flex w-full md:flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-emerald-600 hover:text-white"
              >
                {btn.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
