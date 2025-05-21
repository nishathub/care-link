import AboutCareLink from "@/components/HomeComponents/AboutCareLink";
import Attention from "@/components/HomeComponents/Attention";
import ImpactStories from "@/components/HomeComponents/ImpactStories";
import OngoingCases from "@/components/HomeComponents/OngoingCases";
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
          <OngoingCases></OngoingCases>
        </section>
        <section>
          <ImpactStories></ImpactStories>
        </section>
        <section>
          <Attention></Attention>
        </section>
        <section>
          <RecentNews></RecentNews>
        </section>


      </div>
    </div>
  );
}
