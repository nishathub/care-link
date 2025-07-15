"use client";
import { formatDate } from "@/utils/formateDate";
import { updateViewCount } from "@/utils/updateViewCount";
import { useRouter } from "next/navigation";

const RecentItemsSuggestionComponent = ({ itemCollection = [], itemName }) => {
  const router = useRouter();
  const fallbackImage =
    "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg";

  const handleNewsLink = (id, views) => {
    if (itemName === "News") {
      const apiLink = `${process.env.NEXT_PUBLIC_CareLinkAPI}/news/${id}/views`;
      updateViewCount(views, apiLink);
      router.push(`/news-updates/${id}`);
      return;
    } else if (itemName === "Stories") {
      const apiLink = `${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories/${id}/views`;
      updateViewCount(views, apiLink);
      router.push(`/impact-stories/${id}`);
      return;
    } else {
      console.error(`Unknown ItemName: ${itemName}`);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-6">
        {itemCollection?.map((item, index) => (
          <div className="flex gap-3" key={index}>
            <div>
              <img
                className="w-16 h-16 object-cover"
                src={item?.imageLink || fallbackImage}
                alt="news-photo"
              />
            </div>
            <div className="flex-1">
              <button
                onClick={() => handleNewsLink(item?._id, item?.views)}
                className="font-semibold text-left cursor-pointer hover:text-sky-700 transition-colors"
              >
                {item?.title}
              </button>
              <div className="text-sm flex">
                {item?.views && (
                  <p className="w-[72px] shrink-0">{item?.views} views</p>
                )}
                <p>{item?.date ? formatDate(item?.date) : ""}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentItemsSuggestionComponent;
