"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewCountButton = ({ readMoreLink, showViews, id, views }) => {
  const router = useRouter();
  const handleViewCount = async (e) => {
    e.preventDefault();
    console.log("view count is working");
    router.push(readMoreLink);
    const updatedData = {
      views: parseInt(views) + 1,
    };
    console.log(updatedData);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories/${id}/views`,
        updatedData
      );
    } catch (error) {
      console.log("view count update error");
    }
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
