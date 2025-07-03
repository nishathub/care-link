"use client";

import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";

const UserReviewDetails = ({ data }) => {
  const router = useRouter();
  const user = useUserStore((state) => state?.user);

  const handleReject = async () => {
    const updatedData = {
      approved: "rejected",
    };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/users/${data?._id}`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        router.push("/admin/manage-users");
      }
    } catch (error) {
      console.log("user verification update error", error);
    }
  };

  const handleApprove = async () => {
    const updatedData = {
      approved: true,
    };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/users/${data?._id}`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        router.push("/admin/manage-users");
      }
    } catch (error) {
      console.log("user verification update error", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <SectionHeading
        heading="User Review Page"
        paragraph="Review and verify the user profile before approval"
      />

      <div className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow border space-y-6">
        {/* Basic Info */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold mb-4">{data?.name}</h2>
          <p className="text-sm italic">{data?.email}</p>
        </div>

        {/* General Info */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">Phone:</span> {data?.phone}</p>
          <p><span className="font-semibold">Occupation:</span> {data?.occupation}</p>
          <p><span className="font-semibold">Address:</span> {data?.address}</p>
          <p><span className="font-semibold">Interest Area:</span> {data?.interestArea}</p>
          <p><span className="font-semibold">Reference:</span> {data?.reference}</p>
          <p><span className="font-semibold">Available Now:</span> {String(data?.availableNow)}</p>
          <p><span className="font-semibold">Approved:</span> {String(data?.approved)}</p>
          <p><span className="font-semibold">Role:</span> {data?.role}</p>
        </div>

        {/* Image */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Profile Image</h3>
          {data?.imageLink ? (
            <div className="h-72 w-72 relative rounded-lg shadow-2xl">
              <Image
                src={data?.imageLink}
                alt="user-photo"
                fill
                unoptimized
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <p>No profile image</p>
          )}
        </div>

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

export default UserReviewDetails;
