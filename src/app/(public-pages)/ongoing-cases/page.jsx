export const dynamic = "force-dynamic";

import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
const OngoingCases = async () => {
  return (
    <div>
      <OngoingCasesComponent
        hideMoreButton={true}
        hideSectionTitle={true}
      ></OngoingCasesComponent>
    </div>
  );
};

export default OngoingCases;
