'use client';

import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  FolderKanban,
  FileText,
  Users,
  HandCoins,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarLinkCollection = () => {
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
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 shadow-lg">
      <SidebarLink href="/admin/dashboard" text="Dashboard" Icon={LayoutDashboard} />
      <SidebarLink
        href="/admin/add-ongoing-project"
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
        href="/admin/manage-projects"
        text="Manage Projects"
        Icon={FolderKanban}
      />
      <SidebarLink
        href="/admin/manage-stories"
        text="Manage Stories"
        Icon={BookOpen}
      />
      <SidebarLink href="/admin/manage-news" text="Manage News" Icon={FileText} />
      <SidebarLink href="/admin/manage-users" text="Manage Users" Icon={Users} />
      <SidebarLink
        href="/admin/donation-logs"
        text="Donation Logs"
        Icon={HandCoins}
      />
      <SidebarLink href="/admin/volunteers" text="Volunteers" Icon={HeartHandshake} />
      <SidebarLink href="/admin/donors" text="Donors" Icon={HeartHandshake} />
    </nav>
  );
};

export default SideBarLinkCollection;
