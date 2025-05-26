import PublicPageCover from "@/components/PublicPageCover/PublicPageCover";


export default function PublicPageLayout({ children }) {
  return (
    <div className="min-h-screen">
      <PublicPageCover />
      <div className="max-w-7xl mx-auto px-2 sm:px-0 py-8">
        {children}
      </div>
    </div>
  );
}
