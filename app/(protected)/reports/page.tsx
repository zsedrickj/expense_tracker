import { ChartBarMultiple } from "@/components/ui/barChart";
import React from "react";

const ReportPage = () => {
  return (
    <div className="flex-1 transition-all duration-300 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Reports</h1>
          <p className="text-gray-500">
            Analyze your spending patterns and trends
          </p>
        </div>
      </div>
      <ChartBarMultiple />
    </div>
  );
};

export default ReportPage;
