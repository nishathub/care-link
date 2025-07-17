import { formatDate } from "@/utils/formateDate";
import Link from "next/link";
import ViewCountButton from "./ViewCountButton";

const Card = ({
  id,
  date,
  views,
  tag,
  title,
  description,
  introduction = "",
  context = "",
  image,
  donateLink = "",
  readMoreLink = "",
  showViews = false,
  itemName,
}) => {
  const descriptionPreview = () => {
    if (introduction.length > 0) {
      return (
        <p className="text-justify">
          {introduction?.length > 220
            ? introduction.slice(0, 220) + "..."
            : introduction}
        </p>
      );
    } else if (context.length > 0) {
      return (
        <p className="text-justify">
          {context?.length > 220 ? context.slice(0, 220) + "..." : context}
        </p>
      );
    } else {
      return (
        <p className="text-justify">
          {description?.length > 220
            ? description.slice(0, 220) + "..."
            : description}
        </p>
      );
    }
  };
  return (
    <div className="card bg-sky-100 w-[calc(100vw-16px)] sm:w-80 lg:w-96 shadow-sm hover:shadow-xl transition-shadow">
      <figure>
        <img
          src={image}
          className="w-full sm:w-80 lg:w-96 h-48 object-cover"
          alt={`${itemName}-image`}
        />
      </figure>
      <div className="card-body relative">
        {showViews && (
          <p title="view" className="absolute right-6 bottom-6">
            👁 <span>{views && views}</span>
          </p>
        )}
        {date ? (
          <div className="flex justify-between">
            <p className="text-sky-800 font-medium">
              {date ? formatDate(date) : ""}
            </p>
            <p className="text-sky-700 text-sm text-right font-medium capitalize">
              {tag}
            </p>
          </div>
        ) : (
          <p className="text-sky-700 text-sm font-medium capitalize">{tag}</p>
        )}
        <h2 className="card-title">{title}</h2>
        {descriptionPreview()}
        <div className="card-actions justify-start mt-2">
          {donateLink && (
            <Link
              href={donateLink}
              className={`btn bg-sky-800 hover:bg-sky-700 text-white w-full`}
            >
              Details
            </Link>
          )}
          {readMoreLink && (
            <ViewCountButton
              readMoreLink={readMoreLink}
              showViews={showViews}
              itemName={itemName}
              id={id}
              views={views}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
