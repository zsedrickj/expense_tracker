import AddButton from "@/components/ui/addButton";
import React from "react";

const CategoryPage = () => {
  return (
    <div className="flex-1  transition-all duration-300 overflow-x-auto mb-10 m-auto max-w-350">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage your transaction categories</p>
        </div>
        <AddButton name="Add Category" />
      </div>
    </div>
  );
};

export default CategoryPage;
