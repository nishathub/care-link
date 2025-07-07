import Footer from "@/components/Footer/Footer";
import AboutCareLink from "@/components/HomeComponents/AboutCareLink";
import AttentionBanner from "@/components/HomeComponents/AttentionBanner/AttentionBanner";
import ImpactStoriesComponent from "@/components/HomeComponents/ImpactStoriesComponent";
import OngoingCasesComponent from "@/components/HomeComponents/OngoingCasesComponent";
import ImageSlider from "@/components/HomeComponents/ImageSlider/ImageSlider";
import Navbar from "@/components/Navbar/Navbar";
import NewsComponent from "@/components/HomeComponents/NewsComponent";

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
          <ImpactStoriesComponent isHomePage={true}></ImpactStoriesComponent>
        </section>
        <section>
          <AttentionBanner></AttentionBanner>
        </section>
        <section>
          <NewsComponent isHomePage={true}></NewsComponent>
        </section>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
