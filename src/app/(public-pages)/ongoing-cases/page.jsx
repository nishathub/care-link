import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { getOngoingProjects } from "@/lib/getOngoingProjects";

const OngoingCases = async () => {
  const data  = await getOngoingProjects();

  return (
    <div>
      <SectionHeading heading={"Recent Activities"}></SectionHeading>
      <div>
        <OngoingCasesComponent
          hideMoreButton={true}
          hideSectionTitle={true}
          data={data}
        ></OngoingCasesComponent>
      </div>
    </div>
  );
};

export default OngoingCases;
