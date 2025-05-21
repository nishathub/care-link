import AboutCareLink from "@/components/HomeComponents/AboutCareLink";
import OngoingCases from "@/components/HomeComponents/OngoingCases";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden">
        <ImageSlider></ImageSlider>
      </section>
      <div className="max-w-7xl w-full mx-auto space-y-8 border">
        <section>
          <AboutCareLink></AboutCareLink>
        </section>
        <section>
          <OngoingCases></OngoingCases>
        </section>

      </div>
    </div>
  );
}
