"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import useProjects from "@/hooks/useProjects";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";
import useUserStore from "@/lib/zustand/userStore";

const ManageProjects = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const isChief = useUserStore((state) => state?.isChief);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const {
    allProjects: allProjects,
    isAllProjectLoading,
    errorFetchProjectsMessage,
    ProjectsRefetch,
  } = useProjects("pending");

  const handleDeleteClick = (itemId) => {
    setProjectIdToDelete(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="">
      {/* Delete Modal */}
      <div>
        <DeleteConfirmModal
          apiBaseURL={`${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects`}
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          itemName={"Project"}
          itemId={projectIdToDelete}
          isDeleteLoading={isDeleteLoading}
          setDeleteLoading={setDeleteLoading}
          refetch={ProjectsRefetch}
        />
      </div>
      <div className="">
        <SectionHeading
          heading="Manage Projects"
          paragraph="List of all Ongoing Projects"
        />
      </div>
      <div>
        <ManageItemsTable
          data={allProjects}
          isChief={isChief}
          isUserLoading={isUserLoading}
          itemName={"Projects"}
          editBaseLink={"/volunteer/edit-ongoing-project"}
          handleDeleteClick={handleDeleteClick}
          isDataLoading={isAllProjectLoading}
          isDeleteLoading={isDeleteLoading}
          errorFetchDataMessage={errorFetchProjectsMessage}
        ></ManageItemsTable>
      </div>
    </div>
  );
};

export default ManageProjects;
