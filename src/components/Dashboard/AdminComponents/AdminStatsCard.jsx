import { getAdminStats } from "@/lib/getAdminStats";
import Link from "next/link";

const AdminStatsCard = async () => {
  const {
      totalProjects,
      totalStories,
      totalNews,
      totalPackages,
      totalVolunteers,
      totalDonors,
    } = await getAdminStats();

  const stats = [
    { label: "Ongoing Projects", value: totalProjects, link: "/volunteer/manage-projects" },
    { label: "Impact Stories", value: totalStories, link: "/admin/manage-stories" },
    { label: "News", value: totalNews, link: "/admin/manage-news" },
    { label: "Donation Packages", value: totalPackages, link: "/admin/manage-donation-packages" },
    { label: "Active Volunteers", value: totalVolunteers, link: "/admin/manage-volunteers" },
    { label: "Active Donors", value: totalDonors, link: "/admin/manage-donors" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <Link href={stat.link} key={stat.label} className="bg-sky-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-sm">{stat.label}</h2>
          <p className="text-2xl font-bold">{stat.value}</p>
        </Link>
      ))}
    </div>
  );
};

export default AdminStatsCard;
