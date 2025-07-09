"use client";

import CustomLoading from "@/components/CustomLoading/CustomLoading";
import {
  LayoutDashboard,
  House,
  PlusCircle,
  BookOpen,
  FolderKanban,
  FileText,
  Users,
  HandCoins,
  HeartHandshake,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinkCollection = ({ user, isUserLoading }) => {
  const pathname = usePathname();
  const SidebarLink = ({ href, text, Icon }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 py-2 px-3 rounded transition-colors 
        ${
          isActive
            ? "bg-sky-800 text-white"
            : "text-gray-800 hover:text-sky-700 hover:bg-gray-200"
        }`}
      >
        <Icon
          size={18}
          className={`transition-colors ${
            isActive ? "text-white" : "text-gray-600 hover:text-sky-700"
          }`}
        />
        <span>{text}</span>
      </Link>
    );
  };
  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center">
        <CustomLoading />
      </div>
    );
  }
  if (user?.role === "admin") {
    return (
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 shadow-lg">
        <SidebarLink href="/" text="HomePage" Icon={House} />
        <SidebarLink
          href="/admin/dashboard"
          text="Dashboard"
          Icon={LayoutDashboard}
        />
        <SidebarLink
          href="/volunteer/add-ongoing-project"
          text="Add Ongoing Project"
          Icon={PlusCircle}
        />
        <SidebarLink
          href="/admin/add-impact-story"
          text="Add Impact Story"
          Icon={PlusCircle}
        />
        <SidebarLink href="/admin/add-news" text="Add News" Icon={PlusCircle} />
        <SidebarLink
          href="/admin/add-donation-package"
          text="Add Package"
          Icon={PlusCircle}
        />
        <SidebarLink
          href="/volunteer/manage-projects"
          text="Manage Projects"
          Icon={FolderKanban}
        />
        <SidebarLink
          href="/admin/review-projects"
          text="Review Projects"
          Icon={ShieldCheck}
        />
        <SidebarLink
          href="/admin/manage-stories"
          text="Manage Stories"
          Icon={BookOpen}
        />
        <SidebarLink
          href="/admin/manage-news"
          text="Manage News"
          Icon={FileText}
        />
        <SidebarLink
          href="/admin/manage-donation-packages"
          text="Manage Packages"
          Icon={CircleDollarSign}
        />
        <SidebarLink
          href="/admin/manage-users"
          text="Manage Users"
          Icon={Users}
        />
        <SidebarLink
          href="/admin/donation-logs"
          text="Donation Logs"
          Icon={HandCoins}
        />
      </nav>
    );
  }
  if (user?.role === "volunteer") {
    return (
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 shadow-lg">
        <SidebarLink href="/" text="HomePage" Icon={House} />
        <SidebarLink
          href="/volunteer/dashboard"
          text="Dashboard"
          Icon={LayoutDashboard}
        />
        <SidebarLink
          href="/volunteer/add-ongoing-project"
          text="Add Ongoing Project"
          Icon={PlusCircle}
        />
        <SidebarLink
          href="/volunteer/manage-projects"
          text="Manage Projects"
          Icon={FolderKanban}
        />
      </nav>
    );
  }
};

export default SideBarLinkCollection;
