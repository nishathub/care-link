"use client";
import useUserStore from "@/lib/zustand/userStore";
import Dropdown from "../SideNavbar/Dropdown";
import { useState } from "react";
import CustomLoading from "@/components/CustomLoading/CustomLoading";

const TopDashboard = () => {
  const user = useUserStore((state) => state?.user);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);
  const logout = useUserStore((state) => state?.logout);
  const [showDropdown, setShowDropdown] = useState(false);

  if (isUserLoading) {
    return <p className="mb-8 mx-auto">
      <CustomLoading size={32}/>
    </p>;
  }
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-lg sm:text-2xl text-sky-800 font-bold capitalize">
        {user?.role} Dashboard
      </h1>
      <div className="flex items-center gap-4 relative">
        <span className="text-sm sm:text-md font-medium text-sky-800 capitalize">
          {user?.role}
        </span>
        <img
          onClick={() => setShowDropdown(!showDropdown)}
          src={user?.imageLink || "https://res.cloudinary.com/dntewbvod/image/upload/v1751861766/user-avatar_vaibmz.png"}
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
        {showDropdown && <Dropdown logout={logout}></Dropdown>}
      </div>
    </div>
  );
};

export default TopDashboard;
