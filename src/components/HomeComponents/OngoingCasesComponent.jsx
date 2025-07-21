import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getOngoingProjects } from "@/lib/getOngoingProjects";
import ComponentsClient from "./ComponentsClient";

const OngoingCasesComponent = async ({ isHomePage = false }) => {
  let renderItems = [];
  try {
    const data = await getOngoingProjects();
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
            heading={"Ongoing Projects"}
            textColor="black"
          ></SectionHeading>
        </div>
      )}

      <ComponentsClient
        itemName={"project"}
        isHomePage={isHomePage}
        initialData={renderItems}
      />
      <div className="w-fit mx-auto mt-6">
        {isHomePage && (
          <Link
            className="btn bg-sky-800 hover:bg-sky-700 text-white w-40"
            href={"/ongoing-cases"}
          >
            More
          </Link>
        )}
      </div>
    </div>
  );
};

export default OngoingCasesComponent;
