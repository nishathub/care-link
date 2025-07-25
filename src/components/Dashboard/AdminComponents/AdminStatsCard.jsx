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
      icon: <FolderKanban className="w-6 sm:w-8 text-sky-800" />,
      value: approvedProjects,
      link: "/volunteer/manage-projects",
    },
    {
      label: "Success Stories",
      icon: <BookOpen className="w-6 sm:w-8 text-sky-800" />,
      value: totalStories,
      link: "/admin/manage-stories",
    },
    {
      label: "News",
      icon: <FileText className="w-6 sm:w-8 text-sky-800" />,
      value: totalNews,
      link: "/admin/manage-news",
    },
    {
      label: "Donation Packages",
      icon: <CircleDollarSign className="w-6 sm:w-8 text-sky-800" />,
      value: totalPackages,
      link: "/admin/manage-donation-packages",
    },
    {
      label: "Active Volunteers",
      icon: <HeartHandshake className="w-6 sm:w-8 text-sky-800" />,
      value: approvedVolunteers,
      link: "/admin/manage-users",
    },
    {
      label: "Active Donors",
      icon: <User className="w-6 sm:w-8 text-sky-800" />,
      value: approvedDonors,
      link: "/admin/manage-users",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat) => (
        <Link
          href={stat.link}
          key={stat.label}
          className="w-full bg-sky-100 p-3 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-sky-200 p-2 sm:p-3 rounded-full">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">
                {stat.label}
              </h3>
              <p className="text-xl sm:text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminStatsCard;
