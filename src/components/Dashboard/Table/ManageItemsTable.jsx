import { Edit, Maximize } from "lucide-react";
import Link from "next/link";
import DeleteItemButton from "./DeleteItemButton";
import DisplayToggle from "./DisplayToggle";

const ManageItemsTable = ({
  isReviewProjects = false,
  afterIdAPI,
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
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  if (isDataLoading || isDeleteLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center inset-0">
        <p>Loading...</p>
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
  const showAuthor = data?.some((item) => item?.author !== undefined);
  const showViews = data?.some((item) => item?.views !== undefined);
  const showName = data?.some((item) => item?.name !== undefined);
  const showRole = data?.some((item) => item?.role !== undefined);
  const showRank = data?.some((item) => item?.rank !== undefined);
  const showTitle = data?.some((item) => item?.title !== undefined);
  const showStatus = data?.some(
    (item) => item?.hidden !== undefined && !isReviewProjects && !isVolunteer
  );
  const showVerification = data?.some((item) => item?.approved !== undefined);
  const showJournalist = data?.some((item) => item?.journalist !== undefined);

  return (
    <div className="bg-gray-300 text-gray-800 p-4 rounded-md">
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
              <th>Image</th>
              {showStatus && <th>Display</th>}
              {showVerification && <th>Verification</th>}
              {showTag && <th>Tag</th>}
              {showAuthor && <th>Author</th>}
              {showViews && <th>Views</th>}
              {showJournalist && <th>Journalist</th>}
              {showName && <th>Name</th>}
              {showRole && <th>Role</th>}
              {showRank && <th>Rank</th>}
              {showTitle && <th>Title</th>}
              {isReviewProjects && <th>Expand</th>}
              <th>Edit</th>
              {isChief && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="border-b-sky-700" key={item?._id}>
                <td>{index + 1}</td>
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
                      <p className="text-pink-600">{item?.approved}</p>
                    )}
                  </td>
                )}
                {showTag && <td>{item?.tag || ""}</td>}
                {showAuthor && <td>{item?.author || ""}</td>}
                {showViews && <td>{item?.views}</td>}
                {showJournalist && <td>{item?.journalist}</td>}
                {showName && <td>{item?.name || ""}</td>}
                {showRole && <td>{item?.role || ""}</td>}
                {showRank && <td>{item?.rank || ""}</td>}
                {showTitle && <td>{item?.title || ""}</td>}
                {isReviewProjects && (
                  <td>
                    <Link
                      href={`review-projects/${item?._id}`}
                      className="cursor-pointer text-blue-600"
                      title="Edit"
                    >
                      <Maximize className="w-5 h-5" />
                    </Link>
                  </td>
                )}
                <td>
                  <Link
                    href={`${editBaseLink}/${item?._id}`}
                    className="cursor-pointer text-blue-600"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                </td>
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
