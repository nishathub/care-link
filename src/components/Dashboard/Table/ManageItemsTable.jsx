import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteItemButton from "./DeleteItemButton";

const ManageItemsTable = ({
  data,
  itemName,
  editBaseLink,
  handleDeleteClick,
  isDataLoading,
  isDeleteLoading,
  errorFetchDataMessage,
}) => {
  if (isDataLoading || isDeleteLoading) {
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
              {showTag && <th>Tag</th>}
              <th>Image</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr className="border-b-sky-700" key={item?._id}>
                <td>{index + 1}</td>
                {showTag && <td>{item?.tag || "Tag"}</td>}
                <td>
                  <div className="flex justify-center w-16">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 lg:w-16 lg:h-16">
                        <img
                          src={item?.imageLink}
                          alt={`Image of ${itemName || "item"}`}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.title || "Item Title"}</td>
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
                <td>
                  <DeleteItemButton
                    onClick={() => handleDeleteClick(item?._id)}
                  ></DeleteItemButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItemsTable;
