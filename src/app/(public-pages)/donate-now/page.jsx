import Card from "@/components/Card/Card";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getDonationPackages } from "@/lib/getDonationPackages";

const DonatePage = async ({ isHomePage = true }) => {
  const data = await getDonationPackages();
  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading heading={"Choose a Package"}></SectionHeading>
        </div>
      )}
      <div className="flex flex-wrap gap-8 justify-center">
        {data.map((project, index) => {
          return (
            <Card
              key={index}
              donateLink={`donate-now/${project._id}`}
              image={
                project?.imageLink ||
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              title={project.title}
              tag={project.tag}
              description={`${
                project?.description?.length > 220
                  ? project.description.slice(0, 220) + "..."
                  : project.description
              }`}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};

export default DonatePage;
