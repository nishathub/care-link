"use client";
import { formatDate } from "@/utils/formateDate";
import { updateViewCount } from "@/utils/updateViewCount";
import { useRouter } from "next/navigation";

const NewsSuggestionComponent = ({ newsCollection }) => {
  const router = useRouter();
  const fallbackImage =
    "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg";

  const handleNewsLink = (id, views) => {
    const apiLink = `${process.env.NEXT_PUBLIC_CareLinkAPI}/news/${id}`;
    updateViewCount(views, apiLink);
    router.push(`/news-updates/${id}`);
  };
  return (
    <div>
      <p className="font-bold text-xl mb-6">Recent News</p>
      <div className="flex flex-col gap-6">
        {newsCollection?.map((item, index) => (
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
              <p className="text-sm">{formatDate(item?.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSuggestionComponent;
