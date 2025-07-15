export const dynamic = 'force-dynamic';

import Card from "@/components/Card/Card";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getDonationPackages } from "@/lib/getDonationPackages";

const DonatePage = async ({ isHomePage = false }) => {
  const data = await getDonationPackages();
  return (
    <div>
      {isHomePage && (
        <div>
          <SectionHeading heading={"Choose a Package"} textColor="black"></SectionHeading>
        </div>
      )}
      <div className="flex flex-wrap gap-8 justify-center">
        {data.map((project, index) => {
          return (
            <Card
              key={index}
              donateLink={`donate-now/${project._id?.toString()}`}
              image={
                project?.imageLink ||
                "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg"
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
