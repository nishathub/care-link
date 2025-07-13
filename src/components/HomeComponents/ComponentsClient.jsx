"use client";

import { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";
import CustomLoading from "../CustomLoading/CustomLoading";

const ComponentsClient = ({ itemName, initialData, isHomePage }) => {
  const [items, setItems] = useState(initialData);
  const [isFetchLoading, setFetchLoading] = useState(false);
  const [isSecondHit, setSecondHit] = useState(false);
  
  const apiLink = {
    project: `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects`,
    story: `${process.env.NEXT_PUBLIC_CareLinkAPI}/impactStories`,
    news: `${process.env.NEXT_PUBLIC_CareLinkAPI}/news`,
  };
  const donateLink = {
    project: `ongoing-cases`,
    story: `impact-stories`,
    news: `news-updates`,
  };

  useEffect(() => {
    const fetchItems = async () => {
      setFetchLoading(true);
      try {
        const itemsFetchRes = await axios.get(apiLink[itemName]);
        const { data } = itemsFetchRes.data;
        const items = isHomePage ? data?.slice(0, 3) : data;
        setItems(items);
      } catch (error) {
        console.error("Client refetch failed:", error);
      } finally {
        setFetchLoading(false);
      }
    };
    // only use this useEffect fetch when no initial data passed
    if (initialData?.length === 0) {
      setSecondHit(true); // this one is to render no data message only when both fetch fail.
      fetchItems();
    }
  }, []);

  if (isFetchLoading) {
    return (
      <div className="m-auto w-fit">
        <CustomLoading size={40} />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {items?.length > 0
        ? items?.map((project, index) => (
            <Card
              key={index}
              donateLink={`${donateLink[itemName]}/${project._id}`}
              image={
                project?.imageLink ||
                "https://res.cloudinary.com/dntewbvod/image/upload/v1752316345/y9DpT_hflfb4.jpg"
              }
              title={project.title}
              tag={project.tag}
              description={project.description}
            />
          ))
        : isSecondHit && (
            <p className="text-red-700 text-center py-4">No Items found.</p>
          )}
    </div>
  );
};

export default ComponentsClient;
