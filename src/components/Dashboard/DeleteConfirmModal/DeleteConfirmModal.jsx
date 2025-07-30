"use client";
import useUserStore from "@/lib/zustand/userStore";
import { CustomAlert } from "@/utils/handleCustomAlert";
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
  const user = useUserStore((state) => state?.user);
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
        CustomAlert({
          alertText: `${itemName} Deleted`,
          alertType: "succeed",
        });
      }
    } catch (err) {
      console.error("Delete failed:", err);
      CustomAlert({
        alertText: "Delete failed.",
        alertType: "error",
      });
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      refetch();
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center duration-500 transition-all ${
        isDeleteModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-80 p-8 m-auto flex flex-col justify-center items-center gap-2 bg-gray-100 rounded-md relative">
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="absolute right-0 top-0 bg-red-700 hover:bg-red-800 px-4 py-2 text-gray-100"
        >
          X
        </button>
        <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Confirm Deletion
        </h4>
        <p className="text-center mb-6 text-gray-600">
          Are you sure you want to delete this <strong>{itemName}</strong>?
        </p>
        <div className="flex gap-6">
          <button
            className="btn font-cinzel btn-error text-white"
            onClick={handleConfirmDelete}
            disabled={isDeleteLoading}
          >
            Delete
          </button>
          <button
            className="btn font-cinzel text-gray-200"
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
