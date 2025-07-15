import StoryNewsDetails from "@/components/StoryNewsDetails/StoryNewsDetails";
import { getImpactStories } from "@/lib/getImpactStories";
import { getSingleItemById } from "@/lib/getSingleItemById";
import { notFound } from "next/navigation";

const SingleImpact = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const { id } = params;
  const storyItem = await getSingleItemById("story", id);
  const storyCollection = await getImpactStories();
  const filteredStories = storyCollection.filter(
    (item) => item._id.toString() !== id
  );
  // serialize id
  const plainFilteredStories = filteredStories.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  if (!storyItem) {
    notFound();
  }
  return (
    <div>
      <StoryNewsDetails
        itemName="Stories"
        singleItem={storyItem}
        recentItems={plainFilteredStories}
      />
    </div>
  );
};

export default SingleImpact;
