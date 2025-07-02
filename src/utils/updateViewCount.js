import axios from "axios";

export const updateViewCount = async (views, apiLink) => {
  let newViews = 1;
  if (typeof views === "number" && !isNaN(views)) {
    newViews = views + 1;
  }
  const updatedData = {
    views: newViews,
  };
  try {
    await axios.patch(apiLink, updatedData);
  } catch (error) {
    console.log("view count update error");
  }
};
