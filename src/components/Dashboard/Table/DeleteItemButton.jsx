"use client";

import { Trash2 } from "lucide-react";

const DeleteItemButton = ({ onClick }) => {
  return (
    <button
      className="cursor-pointer"
      title="Delete"
      onClick={onClick}
    >
      <Trash2 className="w-5 h-5 text-red-600" />
    </button>
  );
};

export default DeleteItemButton;
