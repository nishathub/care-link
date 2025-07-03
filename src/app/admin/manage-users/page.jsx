"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useUsers from "@/hooks/useUsers";
import useUserStore from "@/lib/zustand/userStore";

const ManageUsers = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const isChief = useUserStore((state) => state?.isChief);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const { allUsers, isAllUsersLoading, errorFetchUsersMessage, usersRefetch } =
    useUsers();

  const handleDeleteClick = (itemId) => {
    setUserIdToDelete(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="">
      {/* Delete Modal */}
      <div>
        <DeleteConfirmModal
          apiBaseURL={`${process.env.NEXT_PUBLIC_CareLinkAPI}/allUsers`}
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          itemName={"User"}
          itemId={userIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={usersRefetch}
        />
      </div>
      <div className="">
        <SectionHeading heading="Manage Users" paragraph="List of all Users" />
      </div>
      <div>
        <ManageItemsTable
          data={allUsers}
          isChief={isChief}
          isManageUsers={true}
          isUserLoading={isUserLoading}
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

export default ManageUsers;
