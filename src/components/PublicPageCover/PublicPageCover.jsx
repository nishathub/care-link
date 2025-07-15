"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageCover from "@/components/PageCover/PageCover";

const getPageInfo = (pathname) => {
  if (pathname.startsWith("/donate")) {
    return {
      pageName: "Your Generosity, Their Hope",
    };
  } else if (pathname.startsWith("/ongoing")) {
    return {
      pageName: "Our Current Initiatives",
    };
  } else if (pathname.startsWith("/impact")) {
    return {
      pageName: "Lives Changed, Stories Told",
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
