export const dynamic = "force-dynamic";

import ImpactStoriesComponent from "@/components/HomeComponents/ImpactStoriesComponent";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

const ImpactStories = async () => {
  return (
    <div>
      <ImpactStoriesComponent
        hideMoreButton={true}
        hideSectionTitle={true}
      ></ImpactStoriesComponent>
    </div>
  );
};

export default ImpactStories;
