import { getAdminStats } from "@/lib/getAdminStats";
import Link from "next/link";
import {
  User,
  HeartHandshake,
  BookOpen,
  FolderKanban,
  FileText,
  CircleDollarSign,
} from "lucide-react";

const AdminStatsCard = async () => {
  const {
    approvedProjects,
    totalStories,
    totalNews,
    totalPackages,
    approvedVolunteers,
    approvedDonors,
  } = await getAdminStats();

  const stats = [
    {
      label: "Ongoing Projects",
      icon: <FolderKanban className="w-8 h-8 text-sky-800" />,
      value: approvedProjects,
      link: "/volunteer/manage-projects",
    },
    {
      label: "Impact Stories",
      icon: <BookOpen className="w-8 h-8 text-sky-800" />,
      value: totalStories,
      link: "/admin/manage-stories",
    },
    {
      label: "News",
      icon: <FileText className="w-8 h-8 text-sky-800" />,
      value: totalNews,
      link: "/admin/manage-news",
    },
    {
      label: "Donation Packages",
      icon: <CircleDollarSign className="w-8 h-8 text-sky-800" />,
      value: totalPackages,
      link: "/admin/manage-donation-packages",
    },
    {
      label: "Active Volunteers",
      icon: <HeartHandshake className="w-8 h-8 text-sky-800" />,
      value: approvedVolunteers,
      link: "/admin/manage-users",
    },
    {
      label: "Active Donors",
      icon: <User className="w-8 h-8 text-sky-800" />,
      value: approvedDonors,
      link: "/admin/manage-users",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <Link
          href={stat.link}
          key={stat.label}
          className="bg-sky-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-4">
            <div className="bg-sky-200 p-3 rounded-full">{stat.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{stat.label}</h3>
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminStatsCard;
