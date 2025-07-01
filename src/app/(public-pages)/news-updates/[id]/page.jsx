import { getSingleItemById } from "@/lib/getSingleItemById";

const SingleNews = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const newsItem = await getSingleItemById("news", id);

  return <div>Single News page</div>;
};

export default SingleNews;
