import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getNews } from "@/lib/getNews";

const NewsComponent = async ({ isHomePage = false }) => {
  const newsCollection = await getNews();
  const renderItem = isHomePage ? newsCollection?.slice(0, 3) : newsCollection;

  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading
            heading={"Recent News & Updates"}
            paragraph={""}
          ></SectionHeading>
        </div>
      )}
      <div className="flex flex-wrap gap-8 justify-center">
        {renderItem?.map((item, index) => {
          return (
            <Card
              key={index}
              showViews={true}
              itemName={"news"}
              id={item?._id.toString()}
              tag={item?.tag}
              views={item?.views}
              date={item?.date}
              readMoreLink={`/news-updates/${item?._id.toString()}`}
              image={
                item?.imageLink ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={item?.title}
              description={item?.description}
            ></Card>
          );
        })}
      </div>
      {isHomePage && (
        <div className="w-fit mx-auto mt-6">
          <Link className="btn btn-primary w-40" href={"/news-updates"}>
            More
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
