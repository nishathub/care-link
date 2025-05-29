"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import useProjects from "@/hooks/useProjects";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";
import ManageItemsTable from "@/components/Dashboard/Table/ManageItemsTable";

const ManageProjects = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const {
    allProjects: allProjects,
    isAllProjectLoading,
    errorFetchProjectsMessage,
    ProjectsRefetch,
  } = useProjects();

  const handleDeleteClick = (itemId, cloudinaryPublicId) => {
    setProjectIdToDelete(itemId);
    setCloudinaryPublicId(cloudinaryPublicId);
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
          cloudinaryPublicId={cloudinaryPublicId}
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
          itemName={"Projects"}
          editBaseLink={"/edit-ongoing-project"}
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
