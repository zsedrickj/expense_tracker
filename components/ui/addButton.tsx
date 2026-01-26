"use client";

import React from "react";
import { Plus } from "lucide-react";

type AddButtonProps = {
  name: string;
  onClick?: () => void;
};
const AddButton: React.FC<AddButtonProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick} // ✅ dito ang click handler
      className="w-40 h-12 flex items-center justify-center text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 transition-colors duration-300"
    >
      <Plus className="mr-2" /> {name}
    </button>
  );
};

export default AddButton;
