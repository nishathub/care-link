"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useUsers from "@/hooks/useUsers";

const ManageStories = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [storyIdToDelete, setUserIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const {
    allUsers,
    isAllUsersLoading,
    errorFetchUsersMessage,
    usersRefetch,
  } = useUsers();

  const handleDeleteClick = (itemId) => {
    setUserIdToDelete(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="">
      {/* Delete Modal */}
      <div>
        <DeleteConfirmModal
          apiBaseURL={`${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories`}
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          itemName={"User"}
          itemId={storyIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={usersRefetch}
        />
      </div>
      <div className="">
        <SectionHeading
          heading="Manage Users"
          paragraph="List of all Users"
        />
      </div>
      <div>
        <ManageItemsTable
          data={allUsers}
          itemName={"Users"}
          editBaseLink={"/admin/edit-user"}
          handleDeleteClick={handleDeleteClick}
          isDataLoading={isAllUsersLoading}
          isDeleteLoading={isDeleteLoading}
          errorFetchDataMessage={errorFetchUsersMessage}
        ></ManageItemsTable>
      </div>
    </div>
  );
};

export default ManageStories;
