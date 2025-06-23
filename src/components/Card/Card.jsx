import { formatDate } from "@/utils/formateDate";
import Link from "next/link";

const Card = ({
  date,
  views,
  tag,
  title,
  description,
  image,
  donateLink = "",
  readMoreLink = "",
  showViews = false,
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
            👁 <span>{views}</span>
          </p>
        )}
        <p className="text-sky-700 text-sm font-bold capitalize">{tag}</p>
        <p>{date ? formatDate(date) : ""}</p>
        <h2 className="card-title">{title}</h2>
        <p className="text-justify">{description}</p>
        <div className="card-actions justify-start">
          <Link
            href={donateLink}
            className={`${donateLink ? "" : "hidden"} btn btn-primary w-full`}
          >
            Donate
          </Link>
          <Link
            href={readMoreLink}
            className={`${readMoreLink ? "" : "hidden"} btn-link text-sky-500`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
