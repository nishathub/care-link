"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageCover from "@/components/PageCover/PageCover";

const getPageInfo = (pathname) => {
  if (pathname.startsWith("/donate")) {
    return {
      pageName: "Every Contribution Counts",
      imageUrl:
        "https://assets.kpmg.com/is/image/kpmg/hand-holding-wood-house-miniature-and-money-bag-banner:cq5dam.web.1400.350",
    };
  } else if (pathname.startsWith("/ongoing")) {
    return {
      pageName: "Projects in Action",
      imageUrl:
        "https://dailymedia.case.edu/wp-content/uploads/2019/10/08164716/hands-feat.jpg",
    };
  } else if (pathname.startsWith("/impact")) {
    return {
      pageName: "Lives Changed, Stories Told",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwRy8M7z12Dv2qSJl1oB_NIXKajWV_5m98Qg&s",
    };
  } else if (pathname.startsWith("/news")) {
    return {
      pageName: "Stay Informed, Stay Inspired",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNetZ3jT5-hGZE_jqwufdDWsbQGUFzUiQt6g&s",
    };
  } else if (pathname.startsWith("/success")) {
    return { pageName: "Success Stories", imageUrl: "/images/success.jpg" };
  } else if (pathname.startsWith("/contact")) {
    return { pageName: "Contact", imageUrl: "/images/contact.jpg" };
  }

  return {
    pageName: "Page Name",
    imageUrl:
      "https://i.pinimg.com/736x/9b/b1/2c/9bb12c765423608e519fea6cae537dcc.jpg",
  };
};

const PublicPageCover = () => {
  const pathname = usePathname();
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    setPageInfo(getPageInfo(pathname));
  }, [pathname]);

  if (!pageInfo) return null;

  return <PageCover pageName={pageInfo.pageName} image={pageInfo.imageUrl} />;
};

export default PublicPageCover;
