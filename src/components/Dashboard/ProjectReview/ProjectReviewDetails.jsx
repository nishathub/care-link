"use client";

import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";

const ProjectReviewDetails = ({ data }) => {
  const router = useRouter();
  const user = useUserStore((state) => state?.user);

  const handleReject = async () => {
    const updatedData = {
      approved: "rejected",
    };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects/${data?._id}/singleAction`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        router.push("/admin/review-projects");
      }
    } catch (error) {
      console.log("verification update error");
    }
  };
  const handleApprove = async () => {
    const updatedData = {
      approved: true,
    };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects/${data?._id}/singleAction`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        router.push("/volunteer/manage-projects");
      }
    } catch (error) {
      console.log("verification update error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <SectionHeading
        heading="Project Review Page"
        paragraph="Verify and validate the submitted case before approval"
      />

      <div className="bg-gray-300 text-gray-700 p-6 rounded-xl shadow border space-y-6">
        {/* Case Info */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {data?.title}
          </h2>
          <p className=" italic">Quote: "{data?.relatedQuote}"</p>
        </div>

        {/* General Info */}
        <div className="grid md:grid-cols-2 gap-4 text-sm ">
          <p>
            <span className="font-semibold">Tag:</span> {data?.tag}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {data?.author}
          </p>
          <p>
            <span className="font-semibold">Hidden:</span>{" "}
            {data?.hidden ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold">Approved:</span> {data?.approved}
          </p>
        </div>

        {/* Expense Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Expense Categories
          </h3>
          <ul className="list-disc list-inside  space-y-1">
            {data?.expenseCategories.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Full Description
          </h3>
          <p className=" text-justify leading-relaxed">{data?.description}</p>
        </div>

        {/* Image Preview */}
        <div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Attached Image
          </h3>
          {data?.imageLink ? (
            <div className="h-80 max-w-xl rounded-lg shadow-2xl relative">
              <Image
                src={data?.imageLink}
                alt="charity-photo"
                fill
                unoptimized
                className="object-cover rounded-lg"
              ></Image>
            </div>
          ) : (
            <p>No image attached</p>
          )}
        </div>

        {/* Approve/Reject Buttons */}
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

export default ProjectReviewDetails;
