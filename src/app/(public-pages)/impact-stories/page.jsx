import ImpactStoriesComponent from "@/components/HomeComponents/ImpactStoriesComponent";
import SectionHeading from "@/components/SectionHeading/SectionHeading";

const ImpactStories = () => {
  return (
    <div>
      <SectionHeading heading={"Success Stories"}></SectionHeading>
      <div>
        <ImpactStoriesComponent
          hideMoreButton={true}
          hideSectionTitle={true}
        ></ImpactStoriesComponent>
      </div>
    </div>
  );
};

export default ImpactStories;
