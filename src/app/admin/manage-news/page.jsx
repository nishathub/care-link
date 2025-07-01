"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useUserStore from "@/lib/zustand/userStore";
import useNews from "@/hooks/useNews";

const ManageNews = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const isChief = useUserStore((state) => state?.isChief);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const {
    allNews,
    isAllNewsLoading,
    errorFetchNewsMessage,
    NewsRefetch,
  } = useNews();

  const handleDeleteClick = (itemId) => {
    setNewsIdToDelete(itemId);
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
          itemName={"News"}
          itemId={newsIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={NewsRefetch}
        />
      </div>
      <div className="">
        <SectionHeading
          heading="Manage News"
          paragraph="List of all News"
        />
      </div>
      <div>
        <ManageItemsTable
          data={allNews}
          isChief={isChief}
          isUserLoading={isUserLoading}
          itemName={"News"}
          editBaseLink={"/admin/edit-news"}
          middleAPI={"news"}
          afterIdAPI={""}
          handleDeleteClick={handleDeleteClick}
          isDataLoading={isAllNewsLoading}
          isDeleteLoading={isDeleteLoading}
          errorFetchDataMessage={errorFetchNewsMessage}
          itemsRefetch={NewsRefetch}
        ></ManageItemsTable>
      </div>
    </div>
  );
};

export default ManageNews;
