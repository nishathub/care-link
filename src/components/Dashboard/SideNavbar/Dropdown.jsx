"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const Dropdown = ({ user, logout, position = "up" }) => {
  const router = useRouter();
  const [isLoggingOut, setLoggingOut] = useState(false);
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const logoutRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CareLinkAPI}/auth/logout`
      );
      if (logoutRes.data.success) {
        logout(); // remove user from zustand state
        router.push("/login");
        alert("logout successful");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoggingOut(false);
    }
  };
  const myProfileLinkMap = {
    admin: `/admin/my-profile/${user?.id}`,
    volunteer: `/volunteer/my-profile/${user?.id}`,
    donor: `/donor/my-profile/${user?.id}`,
  };
  const positionStyle = () => {
    if (position === "up") {
      return "bottom-16";
    }
    if (position === "down") {
      return "top-16";
    }
  };
  return (
    <div
      className={`absolute ${positionStyle()} right-0 w-40 bg-gray-50 shadow-lg rounded-lg z-50`}
    >
      <Link href={myProfileLinkMap[user?.role] || ""}>
        <p className="text-black px-4 py-2 flex items-center rounded-lg gap-2 hover:bg-gray-200"> <User size={16}/> My Profile</p>
      </Link>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`w-full text-left ${
          isLoggingOut
            ? "bg-gray-200 text-pink-400"
            : "hover:bg-gray-200 text-red-700 cursor-pointer"
        }  px-4 py-2 flex items-center rounded-lg gap-2`}
      >
        <LogOut size={16} />
        {isLoggingOut ? "Signing Out.." : "Logout"}
      </button>
    </div>
  );
};

export default Dropdown;
