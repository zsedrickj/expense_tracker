"use client";

import React from "react";
import { Plus } from "lucide-react";

type AddButtonProps = {
  name: string;
};
const AddButton: React.FC<AddButtonProps> = ({ name }) => {
  return (
    <button className="w-40 h-12  flex  items-center justify-center text-white bg-emerald-400 rounded-lg hover:bg-emerald-500 transition-colors duration-300">
      <Plus /> {name}
    </button>
  );
};

export default AddButton;
