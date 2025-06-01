import Footer from "@/components/Footer/Footer";
import AboutCareLink from "@/components/HomeComponents/AboutCareLink";
import AttentionBanner from "@/components/HomeComponents/AttentionBanner/AttentionBanner";
import ImpactStories from "@/components/HomeComponents/ImpactStories";
import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";
import RecentNews from "@/components/HomeComponents/RecentNews";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="bg-sky-200 text-gray-800">
      <header>
        <Navbar></Navbar>
      </header>
      <section className="mt-16 lg:mt-20 overflow-hidden">
        <ImageSlider></ImageSlider>
      </section>
      <div className="max-w-7xl w-full mx-auto space-y-12 py-12">
        <section>
          <AboutCareLink></AboutCareLink>
        </section>
        <section>
          <OngoingCasesComponent isHomePage={true}></OngoingCasesComponent>
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
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
