"use client";
import { formatDate } from "@/utils/formateDate";
import { updateViewCount } from "@/utils/updateViewCount";
import { useRouter } from "next/navigation";

const NewsSuggestionComponent = ({ newsCollection }) => {
  const router = useRouter();

  const handleNewsLink = (id, views) => {
    const apiLink = `${process.env.NEXT_PUBLIC_CareLinkAPI}/news/${id}`;
    updateViewCount(views, apiLink);
    router.push(`/news-updates/${id}`);
  };
  return (
    <div>
      <p className="font-bold text-xl mb-6">Recent News</p>
      <div className="flex flex-col gap-4">
        {newsCollection?.map((item, index) => (
          <button
            onClick={() => handleNewsLink(item?._id, item?.views)}
            className="font-semibold text-left cursor-pointer"
            key={index}
          >
            <h4>{item?.title}</h4>
            <p className="text-sm">{formatDate(item?.date)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsSuggestionComponent;
