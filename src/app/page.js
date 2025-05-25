import AboutCareLink from "@/components/HomeComponents/AboutCareLink";
import AttentionBanner from "@/components/HomeComponents/AttentionBanner/AttentionBanner";
import ImpactStories from "@/components/HomeComponents/ImpactStories";
import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";
import RecentNews from "@/components/HomeComponents/RecentNews";
import ImageSlider from "@/components/ImageSlider/ImageSlider";

export default function Home() {
  return (
    <div className="">
      <section className="overflow-hidden">
        <ImageSlider></ImageSlider>
      </section>
      <div className="max-w-7xl w-full mx-auto space-y-12 py-12 border">
        <section>
          <AboutCareLink></AboutCareLink>
        </section>
        <section>
          <OngoingCasesComponent></OngoingCasesComponent>
        </section>
        <section>
          <ImpactStories></ImpactStories>
        </section>
        <section>
          <AttentionBanner></AttentionBanner>
        </section>
        <section>
          <RecentNews></RecentNews>
        </section>


      </div>
    </div>
  );
}
