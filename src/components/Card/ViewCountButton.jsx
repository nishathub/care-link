"use client";

import { updateViewCount } from "@/utils/updateViewCount";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewCountButton = ({
  readMoreLink,
  showViews,
  id,
  views,
  itemName,
}) => {
  const router = useRouter();
  const apiLink =
    itemName === "story"
      ? `${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories/${id}/views`
      : `${process.env.NEXT_PUBLIC_CareLinkAPI}/news/${id}`;
  const handleViewCount = async () => {
    router.push(readMoreLink);
    updateViewCount(views, apiLink);
  };
  if (showViews) {
    return (
      <button
        onClick={handleViewCount}
        className={`btn-link text-sky-700 cursor-pointer`}
      >
        Read More
      </button>
    );
  }
  return (
    <Link href={readMoreLink} className={`btn-link text-sky-700`}>
      Read More
    </Link>
  );
};

export default ViewCountButton;
