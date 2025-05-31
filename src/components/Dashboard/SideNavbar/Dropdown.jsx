"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import axios from "axios";
import { useState } from "react";

const Dropdown = ({ logout }) => {
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
  return (
    <div className="absolute bottom-16 left-4 w-40 bg-white shadow-lg rounded-lg z-50">
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`w-full text-left ${isLoggingOut ? "bg-gray-200 text-pink-400" : "hover:bg-gray-100 text-red-700 cursor-pointer"}  px-4 py-2 flex items-center rounded-lg gap-2`}
      >
        <LogOut size={16} />
        {isLoggingOut ? "Signing Out.." : "Logout"}
      </button>
    </div>
  );
};

export default Dropdown;
