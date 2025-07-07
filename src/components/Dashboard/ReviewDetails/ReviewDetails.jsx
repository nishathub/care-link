"use client";

import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { secureAxios } from "@/utils/secureAxios";
import useUserStore from "@/lib/zustand/userStore";
import { formatDate } from "@/utils/formateDate";

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
        router.push(redirectMap[type]);
      }
    } catch (error) {
      console.log(`${type} verification update error`, error);
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
        router.push(redirectMap[type]);
      }
    } catch (error) {
      console.log(`${type} verification update error`, error);
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
        {type === "user" && (
          <>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold mb-4">{data?.name}</h2>
              <p className="text-sm italic">{data?.email}</p>
            </div>
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
          </>
        )}

        {type === "donation" && (
          <>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold mb-4">{data?.title}</h2>
              <p className="text-sm italic">Donor: {data?.donor}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p><span className="font-semibold">Payment ID:</span> {data?.paymentId}</p>
              <p><span className="font-semibold">Contact:</span> {data?.contact}</p>
              <p><span className="font-semibold">Amount:</span> ${data?.amount}</p>
              <p><span className="font-semibold">Tag:</span> {data?.tag}</p>
              <p><span className="font-semibold">Date:</span> {formatDate(data?.date)}</p>
              <p><span className="font-semibold">Approved:</span> {String(data?.approved)}</p>
            </div>
          </>
        )}

        {type === "project" && (
          <>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold mb-4">{data?.title}</h2>
              <p className="italic">Quote: "{data?.relatedQuote}"</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <p><span className="font-semibold">Tag:</span> {data?.tag}</p>
              <p><span className="font-semibold">Author:</span> {data?.author}</p>
              <p><span className="font-semibold">Hidden:</span> {data?.hidden ? "Yes" : "No"}</p>
              <p><span className="font-semibold">Approved:</span> {String(data?.approved)}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Expense Categories</h3>
              <ul className="list-disc list-inside space-y-1">
                {data?.expenseCategories?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Full Description</h3>
              <p className="text-justify leading-relaxed">{data?.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Attached Image</h3>
              {data?.imageLink ? (
                <div className="h-80 max-w-xl relative rounded-lg shadow-2xl">
                  <Image
                    src={data?.imageLink}
                    alt="project-photo"
                    fill
                    unoptimized
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <p>No image attached</p>
              )}
            </div>
          </>
        )}

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
