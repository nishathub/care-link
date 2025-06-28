import Card from "@/components/Card/Card";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Link from "next/link";


const DonatePage = async ({
  isHomePage = true,
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
            heading={"Choose a Package"}
          ></SectionHeading>
        </div>
      )}
      <div className="flex flex-wrap gap-8 justify-center">
        {renderItem.map((project, index) => {
          return (
            <Card
              key={index}
              donateLink={`ongoing-cases/${project._id}`}
              image={ project?.imageLink ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={project.title}
              tag={project.tag}
              description={`${project?.description?.length > 220 ? project.description.slice(0, 220) + "..." : project.description}`}
            ></Card>
          );
        })}
      </div>
      
    </div>
  );
};

export default DonatePage;
