"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageCover from "@/components/PageCover/PageCover";

const getPageInfo = (pathname) => {
  if (pathname.startsWith("/donate")) {
    return {
      pageName: "Make a Difference Today",
    };
  } else if (pathname.startsWith("/ongoing")) {
    return {
      pageName: "Our Current Initiatives",
    };
  } else if (pathname.startsWith("/impact")) {
    return {
      pageName: "Stories of Hope and Change",
    };
  } else if (pathname.startsWith("/news")) {
    return {
      pageName: "Latest News & Updates",
    };
  } else if (pathname.startsWith("/success")) {
    return { pageName: "Success Stories" };
  } else if (pathname.startsWith("/contact")) {
    return { pageName: "Contact" };
  }

  return {
    pageName: "Page Name",
  };
};

const PublicPageCover = () => {
  const pathname = usePathname();
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    setPageInfo(getPageInfo(pathname));
  }, [pathname]);

  if (!pageInfo) return null;

  return <PageCover pageName={pageInfo.pageName} />;
};

export default PublicPageCover;
