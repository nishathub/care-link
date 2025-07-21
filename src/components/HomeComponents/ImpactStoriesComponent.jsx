import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getImpactStories } from "@/lib/getImpactStories";
import ComponentsClient from "./ComponentsClient";

const ImpactStoriesComponent = async ({ isHomePage = false }) => {
  let renderItems = [];
  try {
    const data = await getImpactStories();
    // serialize into plain string (objectId)
    const serializedData = data.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
    renderItems = isHomePage ? serializedData.slice(0, 3) : serializedData;
  } catch (error) {
    console.error("DB failed");
    renderItems = [];
  }

  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading
            heading={"Impact Stories"}
            textColor="black"
          ></SectionHeading>
        </div>
      )}

      <ComponentsClient
        itemName={"story"}
        isHomePage={isHomePage}
        initialData={renderItems}
      />

      <div className="w-fit mx-auto mt-6">
        {isHomePage && (
          <Link
            className="btn bg-sky-800 hover:bg-sky-700 text-white w-40"
            href={"/impact-stories"}
          >
            More
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImpactStoriesComponent;
