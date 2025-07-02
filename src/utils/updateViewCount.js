import axios from "axios";

export const updateViewCount = async (views, apiLink) => {
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