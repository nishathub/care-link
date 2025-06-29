"use client";

import axios from "axios";

const DisplayToggle = ({ id, hidden, refetch, middleAPI, afterIdAPI=""}) => {
  const handleDisplayToggle = async () => {
    const updatedData = {
      hidden: !hidden,
    };
    try {
      const updateRes = await axios.patch(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/${middleAPI}/${id}/${afterIdAPI}`,
        updatedData
      );
      if (updateRes.data.success) {
        refetch();
      }
    } catch (error) {
      console.error("display toggle update error");
    }
  };
  return (
    <input
      type="checkbox"
      checked={!hidden}
      onChange={handleDisplayToggle}
      className="toggle border-red-600 bg-red-500 checked:border-green-500 checked:bg-green-400 checked:text-green-800"
    />
  );
};

export default DisplayToggle;
