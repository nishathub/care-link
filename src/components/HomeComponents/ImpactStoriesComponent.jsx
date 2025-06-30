import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getImpactStories } from "@/lib/getImpactStories";

const ImpactStoriesComponent = async ({ isHomePage = false }) => {
  const data = await getImpactStories();
  const renderItem = isHomePage ? data.slice(0, 3) : data;
  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading
            heading={"Impact Stories"}
            paragraph={"Your Donation Matters"}
          ></SectionHeading>
        </div>
      )}

      <div className="flex flex-wrap gap-8 justify-center">
        {renderItem.map((story, index) => {
          return (
            <Card
              key={index}
              showViews={true}
              id={story?._id?.toString()}
              readMoreLink={`impact-stories/${story?._id?.toString()}`}
              image={
                story?.imageLink ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={story.title}
              tag={story.tag}
              views={story.views}
              date={story.date}
              description={`${
                story?.description?.length > 220
                  ? story.description.slice(0, 220) + "..."
                  : story.description
              }`}
            ></Card>
          );
        })}
      </div>
      <div className="w-fit mx-auto mt-6">
        {isHomePage && (
          <Link className="btn btn-primary w-40" href={"/impact-stories"}>
            More
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImpactStoriesComponent;
