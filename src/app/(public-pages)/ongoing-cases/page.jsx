import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

const OngoingCases = async () => {
  return (
    <div>
        <SectionHeading heading={"Recent Activities"}></SectionHeading>
      <div>
        <OngoingCasesComponent
          hideMoreButton={true}
          hideSectionTitle={true}
        ></OngoingCasesComponent>
      </div>
    </div>
  );
};

export default OngoingCases;
