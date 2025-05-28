"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Newspaper,
  FolderKanban,
  BookMarked,
  FileText,
  Users,
  HandCoins,
  HeartHandshake,
} from "lucide-react";

const SideNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarLink = ({ href, text, Icon }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 py-2 px-3 rounded transition-colors 
        ${isActive ? "bg-sky-800 text-white" : "text-gray-800 hover:text-sky-700 hover:bg-gray-200"}`}
      >
        <Icon
          size={18}
          className={`transition-colors ${isActive ? "text-white" : "text-gray-600 hover:text-sky-700"}`}
        />
        <span>{text}</span>
      </Link>
    );
  };

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
        <div className="p-4 border-b flex justify-between">
          <p className="font-bold text-xl text-sky-700">Admin Panel</p>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden btn btn-ghost btn-sm"
          >
            <Menu size={24} className="text-sky-800 hover:text-white" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <SidebarLink href="/dashboard" text="Dashboard" Icon={LayoutDashboard} />
          <SidebarLink href="/add-ongoing-project" text="Add Ongoing Project" Icon={PlusCircle} />
          <SidebarLink href="/add-impact-story" text="Add Impact Story" Icon={PlusCircle} />
          <SidebarLink href="/add-news" text="Add News" Icon={PlusCircle} />
          <SidebarLink href="/manage-projects" text="Manage Projects" Icon={FolderKanban} />
          <SidebarLink href="/manage-stories" text="Manage Stories" Icon={BookOpen} />
          <SidebarLink href="/manage-news" text="Manage News" Icon={FileText} />
          <SidebarLink href="/manage-users" text="Manage Users" Icon={Users} />
          <SidebarLink href="/donation-logs" text="Donation Logs" Icon={HandCoins} />
          <SidebarLink href="/volunteers" text="Volunteers" Icon={HeartHandshake} />
          <SidebarLink href="/donors" text="Donors" Icon={HeartHandshake} />
        </nav>

        {/* Profile Info */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Image
              src="https://t4.ftcdn.net/jpg/06/72/16/39/360_F_672163907_F9iv8hElbhWk9KmDR1HkVAadniCElTyB.jpg"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">Admin Name</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;
