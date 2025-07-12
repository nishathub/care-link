'use client';

import { useEffect, useState } from "react";
import Card from "../Card/Card";

const  ComponentsClient= ({ itemName, initialData, isHomePage }) => {
  const [items, setItems] = useState(initialData);
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
    if (items.length === 0) {
      fetch(apiLink[itemName])
        .then((res) => res.json())
        .then((data) => {
          const items = isHomePage ? data.slice(0, 3) : data;
          setItems(items);
        })
        .catch((err) => console.error("Client refetch failed:", err));
    }
  }, [items.length, isHomePage]);

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {items.length > 0 ? (
        items.map((project, index) => (
          <Card
            key={index}
            donateLink={`${donateLink[itemName]}/${project._id}`}
            image={
              project?.imageLink ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            title={project.title}
            tag={project.tag}
            description={project.description}
          />
        ))
      ) : (
        <p>No ongoing cases found.</p>
      )}
    </div>
  );
}

export default ComponentsClient;