import { formatDate } from "@/utils/formateDate";
import Link from "next/link";

const NewsSuggestionComponent = ({newsCollection}) => {
  return (
    <div>
      <p className="font-bold text-xl mb-6">Recent News</p>
      <div className="flex flex-col gap-4">
        {newsCollection?.map((item, index) => (
          <Link
            className="font-semibold"
            href={`/news-updates/${item?._id}`}
            key={index}
          >
            <h4>{item?.title}</h4>
            <p className="text-sm">{formatDate(item?.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsSuggestionComponent;
