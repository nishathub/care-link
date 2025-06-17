import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";

const ImpactStoriesComponent = async ({ isHomePage = false }) => {
  const getStories = async () => {
    const careLinkApi = process.env.CareLinkAPI;
    const res = await fetch(`${careLinkApi}/impactStories`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };
  const { data } = await getStories();
  const renderItem = isHomePage ? data.slice(0, 6) : data;
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
              readMoreLink={`impact-stories/${story._id}`}
              image={
                story?.imageLink ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={story.title}
              tag={story.tag}
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
