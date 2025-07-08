"use client";
import { formatDate } from "@/utils/formateDate";
import { updateViewCount } from "@/utils/updateViewCount";
import { useRouter } from "next/navigation";

const NewsSuggestionComponent = ({ newsCollection }) => {
  const router = useRouter();
  const fallbackImage =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

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
