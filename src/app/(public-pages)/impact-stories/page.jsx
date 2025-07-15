export const dynamic = "force-dynamic";

import ImpactStoriesComponent from "@/components/HomeComponents/ImpactStoriesComponent";

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
