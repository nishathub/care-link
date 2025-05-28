"use client";

import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import axios from "axios";
import useProjects from "@/hooks/useProjects";
import Link from "next/link";
import DeleteConfirmModal from "@/components/Dashboard/DeleteConfirmModal/DeleteConfirmModal";

const ManageProjects = () => {
  const router = useRouter();
  const {
    allProjects: allProjects,
    isAllProjectLoading,
    errorFetchProjectsMessage,
    ProjectsRefetch,
  } = useProjects();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClick = (_id) => {
    setProjectIdToDelete(_id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    setDeleteModalOpen(false);
    try {
      const deletedItem = await axios.delete(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects/${projectIdToDelete}`
      );
      if (deletedItem.data.success) {
        alert("Item Deleted");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      ProjectsRefetch();
    }
  };

  return (
    <div className="">
      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleteLoading}
      />

      <div className="">
        <SectionHeading
          heading="Manage Projects"
          paragraph="List of all Ongoing Projects"
        />
      </div>

      {isAllProjectLoading || isDeleteLoading ? (
        <div className="flex justify-center items-center inset-0">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="bg-gray-300 text-gray-800 p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg lg:text-2xl font-semibold">
              Total Projects: {allProjects?.length}
            </h4>
          </div>

          <div className="max-h-[400px] overflow-auto">
            <table className="table text-left">
              <thead className="sticky top-0 bg-sky-800 text-white z-10">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allProjects?.map((project, index) => (
                  <tr key={project._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex justify-center">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={project?.imageLink}
                              alt="project-image"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{project.projectTitle}</td>
                    <td>
                      <Link
                        href={`/edit-ongoing-project/${project._id}`}
                        className="cursor-pointer text-blue-600"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    </td>
                    <td>
                      <button
                        title="Delete"
                        onClick={() => handleDeleteClick(project._id)}
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
