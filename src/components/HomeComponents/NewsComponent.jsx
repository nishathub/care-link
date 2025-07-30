import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getNews } from "@/lib/getNews";
import ComponentsClient from "./ComponentsClient";
import { SquareArrowOutUpRight } from "lucide-react";

const NewsComponent = async ({ isHomePage = false }) => {
  let renderItems = [];
  try {
    const data = await getNews();
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
            heading={"Recent News & Updates"}
            textColor="black"
          ></SectionHeading>
        </div>
      )}

      <ComponentsClient
        itemName={"news"}
        isHomePage={isHomePage}
        initialData={renderItems}
      />

      {isHomePage && (
        <div className="w-fit mx-auto mt-6">
          <Link
            className="btn font-cinzel bg-sky-800 hover:bg-sky-700 text-white w-40"
            href={"/news-updates"}
          >
            View All <SquareArrowOutUpRight className="w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
