"use client";

import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import { formatDate } from "@/utils/formateDate";

const DonationReviewDetails = ({ data }) => {
  const router = useRouter();
  const user = useUserStore((state) => state?.user);

  const handleReject = async () => {
    const updatedData = {
      approved: "rejected",
    };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/donation-logs/${data?._id}`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        router.push("/admin/donation-logs");
      }
    } catch (error) {
      console.log("donation verification update error", error);
    }
  };

  const handleApprove = async () => {
    const updatedData = {
      approved: "approved",
    };
    try {
      const updateRes = await secureAxios(
        "patch",
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/donation-logs/${data?._id}`,
        updatedData,
        user
      );
      if (updateRes.data.success) {
        router.push("/admin/donation-logs");
      }
    } catch (error) {
      console.log("donation verification update error", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <SectionHeading
        heading="Donation Review Page"
        paragraph="Review and verify the donation before approval"
      />

      <div className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow border space-y-6">
        {/* Basic Info */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold mb-4">{data?.title}</h2>
          <p className="text-sm italic">Donor: {data?.donor}</p>
        </div>

        {/* Donation Info */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">Payment ID:</span> {data?.paymentId}</p>
          <p><span className="font-semibold">Contact:</span> {data?.contact}</p>
          <p><span className="font-semibold">Amount:</span> ${data?.amount}</p>
          <p><span className="font-semibold">Tag:</span> {data?.tag}</p>
          <p><span className="font-semibold">Date:</span> {formatDate(data?.date)}</p>
          <p><span className="font-semibold">Approved:</span> {String(data?.approved)}</p>
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

export default DonationReviewDetails;
