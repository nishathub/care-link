import StoryNewsDetails from "@/components/StoryNewsDetails/StoryNewsDetails";
import { getNews } from "@/lib/getNews";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const SingleNews = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const newsItem = await getSingleItemById("news", id);
  const newsCollection = await getNews();
  const filteredNews = newsCollection.filter(
    (item) => item._id.toString() !== id
  );
  // serialize id
  const plainFilteredNews = filteredNews.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  if (!newsItem) {
    notFound();
  }

  return (
    <StoryNewsDetails
      itemName="News"
      singleItem={newsItem}
      recentItems={plainFilteredNews}
    />
  );
};

export default SingleNews;
