"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useStories from "@/hooks/useStories";
import useUserStore from "@/lib/zustand/userStore";

const ManageStories = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [storyIdToDelete, setStoryIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const isChief = useUserStore((state) => state?.isChief);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const {
    allStories,
    isAllStoriesLoading,
    errorFetchStoriesMessage,
    storiesRefetch,
  } = useStories();

  const handleDeleteClick = (itemId) => {
    setStoryIdToDelete(itemId);
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
          itemName={"Story"}
          itemId={storyIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={storiesRefetch}
        />
      </div>
      <div className="">
        <SectionHeading
          heading="Manage Stories"
          paragraph="List of all Impact Stories"
        />
      </div>
      <div>
        <ManageItemsTable
          data={allStories}
          isChief={isChief}
          isUserLoading={isUserLoading}
          itemName={"Stories"}
          editBaseLink={"/admin/edit-impact-story"}
          middleAPI={"impactStories"}
          handleDeleteClick={handleDeleteClick}
          isDataLoading={isAllStoriesLoading}
          isDeleteLoading={isDeleteLoading}
          errorFetchDataMessage={errorFetchStoriesMessage}
          itemsRefetch={storiesRefetch}
        ></ManageItemsTable>
      </div>
    </div>
  );
};

export default ManageStories;
