"use client";

import { usePathname } from "next/navigation";
import PageCover from "@/components/PageCover/PageCover";

const PublicPageLayout = ({ children }) => {
  // Helper function to get dynamic values based on pathname
  const getPageInfo = (pathname) => {
    if (pathname.startsWith("/hio")) {
      return { pageName: "Donate", imageUrl: "/images/donate.jpg" };
    } else if (pathname.startsWith("/volunteer")) {
      return { pageName: "Volunteer", imageUrl: "/images/volunteer.jpg" };
    } else if (pathname.startsWith("/events")) {
      return { pageName: "Events", imageUrl: "/images/events.jpg" };
    } else if (pathname.startsWith("/about")) {
      return { pageName: "About Us", imageUrl: "/images/about.jpg" };
    } else if (pathname.startsWith("/success")) {
      return { pageName: "Success Stories", imageUrl: "/images/success.jpg" };
    } else if (pathname.startsWith("/contact")) {
      return { pageName: "Contact", imageUrl: "/images/contact.jpg" };
    }

    return {
      pageName: "Page Name",
      imageUrl:
        "https://i.pinimg.com/736x/9b/b1/2c/9bb12c765423608e519fea6cae537dcc.jpg",
    }; // default
  };

  const pathname = usePathname();
  const { pageName, imageUrl } = getPageInfo(pathname);

  return (
    <div className="min-h-screen">
      <div>
        <PageCover pageName={pageName} image={imageUrl} />
      </div>
      <div className="border max-w-7xl mx-auto px-2 sm:px-0 py-8">
        {children}
      </div>
    </div>
  );
};

export default PublicPageLayout;
