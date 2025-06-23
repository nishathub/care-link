"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewCountButton = ({ readMoreLink, showViews }) => {
  const router = useRouter();
  const handleViewCount = (e) => {
    e.preventDefault();
    console.log("view count is working");
    router.push(readMoreLink);
  };
  if (showViews) {
    return (
      <a
        onClick={handleViewCount}
        href={readMoreLink}
        className={`btn-link text-sky-500`}
      >
        Read More
      </a>
    );
  }
  return (
    <Link href={readMoreLink} className={`btn-link text-sky-500`}>
      Read More
    </Link>
  );
};

export default ViewCountButton;
