"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import useUserStore from "@/lib/zustand/userStore";
import SideBarLinkCollection from "./SideBarLinks";
import Dropdown from "./Dropdown";
import { useRehydrateUser } from "@/hooks/useRehydrateUser";

const SideNavbar = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useRehydrateUser(); // to refetch user from back
  const user = useUserStore((state) => state?.user);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);
  const logout = useUserStore((state) => state?.logout);

  return (
    <>
      {/* Sidebar toggle for mobile */}
      <div className="lg:hidden pt-5 shadow fixed z-10">
        <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-sm">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed z-30 lg:relative transition-all duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex w-64 bg-gray-300 shadow-lg flex-col h-full`}
      >
        <div className="p-4  shadow-lg flex justify-between">
          {user?.role === "volunteer" && (
            <p className="font-bold text-xl text-sky-700">Volunteer Console</p>
          )}
          {user?.role === "admin" && (
            <p className="font-bold text-xl text-sky-700">Admin Console</p>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden btn btn-ghost btn-sm"
          >
            <Menu size={24} className="text-sky-800 hover:text-white" />
          </button>
        </div>

        <SideBarLinkCollection user={user} isUserLoading={isUserLoading}></SideBarLinkCollection>

        {/* Profile Info */}
        <div className="p-4 relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src="https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-sky-800 font-semibold">{user?.name}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>

          {showDropdown && <Dropdown logout={logout}></Dropdown>}
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
