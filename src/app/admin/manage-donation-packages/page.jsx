"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useUserStore from "@/lib/zustand/userStore";
import useDonationPackages from "@/hooks/useDonationPackages";

const ManageDonationPackages = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [packageIdToDelete, setPackageIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const isChief = useUserStore((state) => state?.isChief);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const {
    allPackages,
    isAllPackagesLoading,
    errorFetchPackagesMessage,
    packagesRefetch,
  } = useDonationPackages();

  const handleDeleteClick = (itemId) => {
    setPackageIdToDelete(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="">
      {/* Delete Modal */}
      <div>
        <DeleteConfirmModal
          apiBaseURL={`${process.env.NEXT_PUBLIC_CareLinkAPI}/donationPackages`}
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          itemName={"Package"}
          itemId={packageIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={packagesRefetch}
        />
      </div>
      <div className="">
        <SectionHeading
          heading="Manage Packages"
          paragraph="List of all Donation Packages"
        />
      </div>
      <div>
        <ManageItemsTable
          data={allPackages}
          isChief={isChief}
          isUserLoading={isUserLoading}
          itemName={"Packages"}
          editBaseLink={"/admin/edit-donation-package"}
          middleAPI={"donationPackages"}
          afterIdAPI={""}
          handleDeleteClick={handleDeleteClick}
          isDataLoading={isAllPackagesLoading}
          isDeleteLoading={isDeleteLoading}
          errorFetchDataMessage={errorFetchPackagesMessage}
          itemsRefetch={packagesRefetch}
        ></ManageItemsTable>
      </div>
    </div>
  );
};

export default ManageDonationPackages;
