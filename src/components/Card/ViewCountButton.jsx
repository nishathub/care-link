"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewCountButton = ({
  readMoreLink,
  showViews,
  id,
  views,
  itemName = "story",
}) => {
  const router = useRouter();
  const apiLink =
    itemName === "story"
      ? `${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories/${id}/views`
      : `${process.env.NEXT_PUBLIC_CareLinkAPI}/news/${id}`;
  const handleViewCount = async (e) => {
    e.preventDefault();
    router.push(readMoreLink);
    const updatedData = {
      views: parseInt(views) + 1,
    };
    try {
      await axios.patch(
        apiLink,
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
