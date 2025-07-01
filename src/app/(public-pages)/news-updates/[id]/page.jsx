import { getSingleItemById } from "@/lib/getSingleItemById";
import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import { notFound } from "next/navigation";

const SingleNews = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const newsItem = await getSingleItemById("news", id);
  const { title, imageLink, description, date, author, views } = newsItem;
  const fallbackImage =
    "https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg";

  if (!newsItem) {
    notFound();
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 md:col-span-3 space-y-8">
        <p className="mb-4">
          <span>date icon</span> {formatDate(date)}
        </p>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="h-96 md:h-[450px] rounded-lg shadow-2xl relative">
          <Image
            src={imageLink ? imageLink : fallbackImage}
            alt="news-photo"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            className="object-cover rounded-lg"
          ></Image>
        </div>
        <div className="flex justify-between">
          <p>author : {author}</p>
          <p>views : {views}</p>
        </div>
        <p>{description}</p>
      </div>
      <div className="col-span-1">right</div>
    </div>
  );
};

export default SingleNews;
