"use client";

import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import UserReviewBox from "./UserReviewBox";
import ProjectReviewBox from "./ProjectReviewBox";
import DonationReviewBox from "./DonationReviewBox";
import { CustomAlert } from "@/utils/handleCustomAlert";

const ReviewDetails = ({ type, data }) => {
  const router = useRouter();
  const user = useUserStore((state) => state?.user);

  // Type-specific API paths and redirect paths
  const apiPathMap = {
    user: `/allUsers/${data?._id}`,
    donation: `/donationLogs/${data?._id}`,
    project: `/ongoingProjects/${data?._id}/singleAction`,
  };

  const redirectMap = {
    user: "/admin/manage-users",
    donation: "/admin/donation-logs",
    project: "/volunteer/manage-projects",
  };

  const handleReject = async () => {
    const updatedData = { approved: "rejected" };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}${apiPathMap[type]}`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        CustomAlert({ alertText: "Rejected", alertType: "error" });
        router.push(redirectMap[type]);
      }
    } catch (error) {
      console.log(`${type} verification update error`);
    }
  };

  const handleApprove = async () => {
    const updatedData = { approved: true };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}${apiPathMap[type]}`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        CustomAlert({ alertText: "Approved", alertType: "succeed" });
        router.push(redirectMap[type]);
      }
    } catch (error) {
      console.log(`${type} verification update error`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <SectionHeading
        heading={`${type} Review Page`}
        paragraph={`Review and verify the ${type} before approval`}
      />

      <div className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow border space-y-6">
        {/* Type-specific details */}
        {type === "user" && <UserReviewBox data={data} />}

        {type === "donation" && <DonationReviewBox data={data} />}

        {type === "project" && <ProjectReviewBox data={data} />}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
