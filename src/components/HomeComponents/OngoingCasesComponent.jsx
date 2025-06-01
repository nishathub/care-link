import Link from "next/link";
import Card from "../Card/Card";
import SectionHeading from "../SectionHeading/SectionHeading";

const OngoingCasesComponent = async ({
  isHomePage = false,
}) => {
  const getProjects = async () => {
    const careLinkApi = process.env.CareLinkAPI;
    const res = await fetch(`${careLinkApi}/ongoingProjects`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };
  const { data } = await getProjects();
  const renderItem = isHomePage ? data.slice(0, 6) : data;

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
        {renderItem.map((project, index) => {
          return (
            <Card
              key={index}
              donateLink={`ongoing-cases/${project._id}`}
              image={
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={project.projectTitle}
              description={`${project.description.slice(0, 220)} ...`}
            ></Card>
          );
        })}
      </div>
      <div className="w-fit mx-auto mt-6">
        {isHomePage && (
          <Link className="btn btn-primary w-60" href={"/ongoing-cases"}>
            More
          </Link>
        )}
      </div>
    </div>
  );
};

export default OngoingCasesComponent;
