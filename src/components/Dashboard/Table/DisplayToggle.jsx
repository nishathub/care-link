"use client";

import { useState } from "react";

const DisplayToggle = ({id, hidden}) => {
  const [checked, setChecked] = useState(false);
  const handleDisplayToggle = () => {
    setChecked(!checked);
    console.log(id)
  }
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
