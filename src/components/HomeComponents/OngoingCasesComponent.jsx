import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getOngoingProjects } from "@/lib/getOngoingProjects";

const OngoingCasesComponent = async ({ isHomePage = false }) => {
  let data = [];
  let renderItem = [];
  try {
    data = await getOngoingProjects();
    renderItem = isHomePage ? data?.slice(0, 3) : data;
  } catch (error) {
    console.error("DB failed");
    renderItem = [];
  }

  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading
            heading={"Ongoing Projects"}
            paragraph={"You can help to ease their lives"}
            textColor="black"
          ></SectionHeading>
        </div>
      )}
      <div className="flex flex-wrap gap-8 justify-center">
        {renderItem?.map((project, index) => {
          return (
            <Card
              key={index}
              donateLink={`ongoing-cases/${project._id}`}
              image={
                project?.imageLink ||
                "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg"
              }
              title={project.title}
              tag={project.tag}
              description={project.description}
            ></Card>
          );
        })}
      </div>
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
