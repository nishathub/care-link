"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useUserStore from "@/lib/zustand/userStore";
import useDonationLogs from "@/hooks/useDonationLogs";

const ManageDonationLogs = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [logIdToDelete, setLogIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const isChief = useUserStore((state) => state?.isChief);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const { allLogs, isAllLogsLoading, errorFetchLogsMessage, logsRefetch } =
    useDonationLogs();

  const handleDeleteClick = (itemId) => {
    setLogIdToDelete(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="">
      {/* Delete Modal */}
      <div>
        <DeleteConfirmModal
          apiBaseURL={`${process.env.NEXT_PUBLIC_CareLinkAPI}/donationLogs`}
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          itemName={"Log"}
          itemId={logIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={logsRefetch}
        />
      </div>
      <div className="">
        <SectionHeading
          heading="Manage Donation Logs"
          paragraph="List of all Donation Logs"
        />
      </div>
      <div>
        <ManageItemsTable
          isManageDonation={true}
          data={allLogs}
          isChief={isChief}
          isUserLoading={isUserLoading}
          itemName={"Donation Logs"}
          editBaseLink={"/admin/edit-donation-log"}
          middleAPI={"donationLogs"}
          afterIdAPI={""}
          handleDeleteClick={handleDeleteClick}
          isDataLoading={isAllLogsLoading}
          isDeleteLoading={isDeleteLoading}
          errorFetchDataMessage={errorFetchLogsMessage}
          itemsRefetch={logsRefetch}
        ></ManageItemsTable>
      </div>
    </div>
  );
};

export default ManageDonationLogs;
