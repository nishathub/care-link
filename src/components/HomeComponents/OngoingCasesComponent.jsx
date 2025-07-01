import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";
import { getOngoingProjects } from "@/lib/getOngoingProjects";

const OngoingCasesComponent = async ({ isHomePage = false }) => {
  const data = await getOngoingProjects();
  const renderItem = isHomePage ? data?.slice(0, 3) : data;

  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading
            heading={"Ongoing Cases"}
            paragraph={"You can help to ease their lives"}
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
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
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
          <Link className="btn btn-primary w-40" href={"/ongoing-cases"}>
            More
          </Link>
        )}
      </div>
    </div>
  );
};

export default OngoingCasesComponent;
