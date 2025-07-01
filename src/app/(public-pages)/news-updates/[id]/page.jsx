import NewsSuggestionComponent from "@/components/NewsSuggestion/NewsSuggestionComponent";
import { getNews } from "@/lib/getNews";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { formatDate } from "@/utils/formateDate";
import { CalendarDays, Eye, User } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

const SingleNews = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const newsItem = await getSingleItemById("news", id);
  const newsCollection = await getNews();
  const filteredNews = newsCollection.filter(
    (item) => item._id.toString() !== id
  );
  const { title, imageLink, description, date, author, views } = newsItem;
  const fallbackImage =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  if (!newsItem) {
    notFound();
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="col-span-1 lg:col-span-3 space-y-8">
        <p className="mb-4 flex items-center gap-2">
          <span>
            <CalendarDays />
          </span>{" "}
          {formatDate(date)}
        </p>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="h-96 lg:h-[450px] rounded-lg shadow-2xl relative">
          <Image
            src={imageLink ? imageLink : fallbackImage}
            alt="news-photo"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            className="object-cover rounded-lg"
          ></Image>
        </div>
        <div className="flex gap-4">
          <p className="flex items-center gap-1">
            <span>
              <User />
            </span>
            {author}
          </p>
          <p className="flex items-center gap-1">
            <span>
              <Eye />
            </span>
            {views}
          </p>
        </div>
        <p className="text-justify">{description}</p>
      </div>
      <div className="col-span-1 pt-12">
        <div className="sticky top-20 max-h-screen overflow-auto">
          <NewsSuggestionComponent newsCollection={filteredNews} />
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
