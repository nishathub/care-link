import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import PublicPageCover from "@/components/PublicPageCover/PublicPageCover";

export default function PublicPageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar></Navbar>
      </header>
      <main className={`mt-16 lg:mt-20 flex-grow bg-sky-200 text-gray-800`}>
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-2 lg:px-0 py-8">{children}</div>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
