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
  image,
  donateLink = "",
  readMoreLink = "",
  showViews = false,
  itemName,
}) => {
  return (
    <div className="card bg-sky-100 w-80 lg:w-96 shadow-sm">
      <figure>
        <img
          src={image}
          className="w-80 lg:w-96 h-40 lg:h-48 object-cover"
          alt="Shoes"
        />
      </figure>
      <div className="card-body relative">
        {showViews && (
          <p title="view" className="absolute right-6 bottom-6">
            👁 <span>{views && views}</span>
          </p>
        )}
        <div className="flex justify-between">
          <p className="text-sky-700 text-sm font-bold capitalize">{tag}</p>
          <p className="text-sky-800 font-bold text-right">
            {date ? formatDate(date) : ""}
          </p>
        </div>
        <h2 className="card-title">{title}</h2>
        <p className="text-justify">
          {description?.length > 220
            ? description.slice(0, 220) + "..."
            : description}
        </p>
        <div className="card-actions justify-start">
          {donateLink && (
            <Link href={donateLink} className={`btn btn-primary w-full`}>
              Donate
            </Link>
          )}
          {readMoreLink && (
            <ViewCountButton
              readMoreLink={readMoreLink}
              showViews={showViews}
              itemName = {itemName}
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
