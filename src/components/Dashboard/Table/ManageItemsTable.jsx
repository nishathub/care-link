import { Edit, Maximize } from "lucide-react";
import Link from "next/link";
import DeleteItemButton from "./DeleteItemButton";
import DisplayToggle from "./DisplayToggle";
import { formatDate } from "@/utils/formateDate";
import CustomLoading from "@/components/CustomLoading/CustomLoading";

const ManageItemsTable = ({
  isReviewProjects = false,
  isManageUsers = false,
  isManageDonation = false,
  afterIdAPI = "",
  middleAPI,
  data,
  isChief,
  isVolunteer = false,
  isUserLoading,
  itemName,
  editBaseLink,
  handleDeleteClick,
  isDataLoading,
  isDeleteLoading,
  errorFetchDataMessage,
  itemsRefetch,
}) => {
  const imageFallbackLink =
    "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg";

  if (isDataLoading || isDeleteLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center inset-0">
       <CustomLoading size={42}/>
      </div>
    );
  }

  if (errorFetchDataMessage) {
    return (
      <div className="flex justify-center items-center inset-0">
        <p className="text-red-700 text-2xl text-center">
          {errorFetchDataMessage || "Error Loading Data"}
        </p>
      </div>
    );
  }
  if (data?.length === 0) {
    return (
      <p className="text-center text-2xl text-red-700">No {itemName} found.</p>
    );
  }

  // A custom boolean to show/hide column
  const showTag = data?.some((item) => item?.tag !== undefined);
  const showImage = data?.some((item) => item?.imageLink !== undefined);
  const showAuthor = data?.some((item) => item?.author !== undefined);
  const showViews = data?.some((item) => item?.views !== undefined);
  const showName = data?.some((item) => item?.name !== undefined);
  const showDonor = data?.some((item) => item?.donor !== undefined);
  const showDate = data?.some((item) => item?.date !== undefined);
  const showAmount = data?.some((item) => item?.amount !== undefined);
  const showRole = data?.some((item) => item?.role !== undefined);
  const showRank = data?.some((item) => item?.rank !== undefined);
  const showTitle = data?.some((item) => item?.title !== undefined);
  const showStatus = data?.some(
    (item) => item?.hidden !== undefined && !isReviewProjects && !isVolunteer
  );
  const showVerification = data?.some((item) => item?.approved !== undefined);
  const showJournalist = data?.some((item) => item?.journalist !== undefined);
  const showAvailability = data?.some(
    (item) => item?.availableNow !== undefined
  );

  return (
    <div className="bg-gray-300 text-gray-800 p-4 rounded-md max-w-[calc(100vw-16px)] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg lg:text-2xl font-semibold">
          Total {itemName}: {data?.length}
        </h4>
      </div>

      <div className="max-h-[calc(100vh-250px)] overflow-auto">
        <table className="table text-left">
          <thead className="sticky top-0 bg-sky-800 text-white z-10">
            <tr>
              <th>#</th>
              {showImage && <th>Image</th>}
              {showStatus && <th>Display</th>}
              {showVerification && <th>Verification</th>}
              {showAvailability && <th>Available Now</th>}
              {showDonor && <th>Donor</th>}
              {showDate && <th>Date</th>}
              {showAmount && <th>Amount</th>}
              {showTag && <th>Tag</th>}
              {showAuthor && <th>Author</th>}
              {showViews && <th>Views</th>}
              {showJournalist && <th>Journalist</th>}
              {showName && <th>Name</th>}
              {showRole && <th>Role</th>}
              {showRank && <th>Rank</th>}
              {showTitle && <th>Title</th>}
              {(isReviewProjects || isManageUsers || isManageDonation) && (
                <th>Expand</th>
              )}
              {!showRole && !isManageDonation && <th>Edit</th>}
              {isChief && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="border-b-sky-700" key={item?._id}>
                <td>{index + 1}</td>
                {showImage && (
                  <td>
                    <div className="flex justify-center w-16">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 lg:w-16 lg:h-16">
                          <img
                            src={item?.imageLink || imageFallbackLink}
                            alt={`Image of ${itemName || "item"}`}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                )}
                {showStatus && (
                  <td title="hide/display">
                    <DisplayToggle
                      id={item?._id}
                      hidden={item?.hidden}
                      refetch={itemsRefetch}
                      afterIdAPI={afterIdAPI}
                      middleAPI={middleAPI}
                    />
                  </td>
                )}
                {showVerification && (
                  <td>
                    {item?.approved === true ? (
                      <p className="text-green-600">Approved</p>
                    ) : (
                      <p className="text-pink-600">
                        {item?.approved || "Pending"}
                      </p>
                    )}
                  </td>
                )}
                {showAvailability && (
                  <td>
                    {item?.availableNow === true ? (
                      <p className="text-green-600">Yes</p>
                    ) : (
                      <p className="text-pink-600">No</p>
                    )}
                  </td>
                )}

                {showDonor && <td>{item?.donor || ""}</td>}
                {showDate && <td>{formatDate(item?.date) || ""}</td>}
                {showAmount && <td>{item?.amount || ""}</td>}
                {showTag && <td>{item?.tag || ""}</td>}
                {showAuthor && <td>{item?.author || ""}</td>}
                {showViews && <td>{item?.views}</td>}
                {showJournalist && <td>{item?.journalist}</td>}
                {showName && <td>{item?.name || ""}</td>}
                {showRole && <td>{item?.role || ""}</td>}
                {showRank && <td>{item?.rank || ""}</td>}
                {showTitle && <td className="min-w-48">{item?.title || ""}</td>}
                {(isReviewProjects || isManageUsers || isManageDonation) && (
                  <td>
                    <Link
                      href={
                        isReviewProjects
                          ? `review-projects/${item?._id}`
                          : isManageDonation
                          ? `donation-logs/${item?._id}`
                          : `manage-users/${item?._id}`
                      }
                      className="cursor-pointer text-blue-600"
                      title="Expand"
                    >
                      <Maximize className="w-5 h-5" />
                    </Link>
                  </td>
                )}
                {!showRole && !isManageDonation && (
                  <td>
                    <Link
                      href={`${editBaseLink}/${item?._id}`}
                      className="cursor-pointer text-blue-600"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                  </td>
                )}
                {/* TO AVOID MAKING THIS A CLIENT COMPONENT */}
                {isChief && (
                  <td>
                    <DeleteItemButton
                      onClick={() =>
                        handleDeleteClick(item?._id, item?.cloudinaryPublicId)
                      }
                    ></DeleteItemButton>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItemsTable;
