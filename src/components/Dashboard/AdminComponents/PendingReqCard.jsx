import { getAdminStats } from "@/lib/getAdminStats";
import { User, ClipboardList, HeartHandshake } from "lucide-react";
import Link from "next/link";

const PendingReqCard = async () => {
  const { pendingDonors, pendingProjects, pendingVolunteers } =
    await getAdminStats();

  const pending = [
    {
      label: "Pending Volunteers",
      count: pendingVolunteers,
      icon: <HeartHandshake className="w-8 h-8 text-sky-800" />,
      href: "/admin/manage-users",
    },
    {
      label: "Pending Donors",
      count: pendingDonors,
      icon: <User className="w-8 h-8 text-sky-800" />,
      href: "/admin/manage-users",
    },
    {
      label: "Pending Projects",
      count: pendingProjects,
      icon: <ClipboardList className="w-8 h-8 text-sky-800" />,
      href: "/admin/review-projects",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {pending.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center justify-between ${item.count ? "bg-pink-200" : "bg-sky-100"} p-6 rounded-2xl shadow-md hover:shadow-lg transition`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-sky-200 p-3 rounded-full">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{item.label}</h3>
              <p className="text-2xl md:text-3xl font-bold">{item.count}</p>
            </div>
          </div>
          <span className="text-sm underline">View</span>
        </Link>
      ))}
    </div>
  );
};

export default PendingReqCard;
