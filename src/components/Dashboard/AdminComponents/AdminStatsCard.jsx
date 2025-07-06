import { getAdminStats } from "@/lib/getAdminStats";
import Link from "next/link";

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
    { label: "Ongoing Projects", value: approvedProjects, link: "/volunteer/manage-projects" },
    { label: "Impact Stories", value: totalStories, link: "/admin/manage-stories" },
    { label: "News", value: totalNews, link: "/admin/manage-news" },
    { label: "Donation Packages", value: totalPackages, link: "/admin/manage-donation-packages" },
    { label: "Active Volunteers", value: approvedVolunteers, link: "/admin/manage-users" },
    { label: "Active Donors", value: approvedDonors, link: "/admin/manage-users" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <Link href={stat.link} key={stat.label} className="bg-sky-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-sm">{stat.label}</h2>
          <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminStatsCard;
