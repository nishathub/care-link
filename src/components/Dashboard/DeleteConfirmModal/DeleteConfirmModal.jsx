"use client";
import useUserStore from "@/lib/zustand/userStore";
import { secureAxios } from "@/utils/secureAxios";

const DeleteConfirmModal = ({
  apiBaseURL,
  isDeleteModalOpen,
  setDeleteModalOpen,
  itemName = "Item",
  itemId,
  isDeleteLoading,
  setDeleteLoading,
  refetch,
}) => {
  const user = useUserStore((state)=> state?.user);
  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    setDeleteModalOpen(false);
    try {
      const deleteItemRes = await secureAxios(
        "delete",
        `${apiBaseURL}/${itemId}`,
        null,
        user
      );
      if (deleteItemRes?.data.success) {
        alert(`${itemName} Deleted`);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to Delete!");
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      refetch();
    }
  };
  return (
    <div
      className={`absolute bg-gray-800/70 flex inset-0 z-20 text-gray-800 duration-500 ${
        isDeleteModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-80 h-60 m-auto flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-md relative">
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="absolute right-0 top-0 bg-red-700 hover:bg-red-800 px-4 py-2 text-gray-100"
        >
          X
        </button>
        <h4 className="text-lg mb-4 font-semibold">Are you sure?</h4>
        <div className="flex gap-6">
          <button
            className="btn btn-error text-white"
            onClick={handleConfirmDelete}
            disabled={isDeleteLoading}
          >
            Delete
          </button>
          <button
            className="btn text-gray-200"
            onClick={() => setDeleteModalOpen(false)}
            disabled={isDeleteLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
