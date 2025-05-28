"use client";

import React from "react";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
}) => {
  return (
    <div
      className={`absolute bg-gray-800/70 flex inset-0 z-20 text-gray-800 duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-md relative">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 bg-red-700 hover:bg-red-800 px-4 py-2 text-gray-100"
        >
          X
        </button>
        <h4 className="text-lg mb-4 font-semibold">{title}</h4>
        <div className="flex gap-6">
          <button
            className="btn btn-error text-white"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </button>
          <button
            className="btn text-gray-200"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
