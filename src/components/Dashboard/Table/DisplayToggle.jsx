"use client";

import axios from "axios";

const DisplayToggle = ({ id, hidden, refetch }) => {
  const handleDisplayToggle = async () => {
    const updatedData = {
      hidden: !hidden,
    };
    try {
      const updateRes = await axios.patch(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/ongoingProjects/${id}/display`,
        updatedData
      );
      if (updateRes.data.success) {
        refetch();
      }
    } catch (error) {
      console.log("display toggle update error");
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
