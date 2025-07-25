import { getAdminStats } from "@/lib/getAdminStats";
import { User, ClipboardList, HeartHandshake, HandCoins } from "lucide-react";
import Link from "next/link";

const PendingReqCard = async () => {
  const {
    pendingDonors,
    pendingProjects,
    pendingVolunteers,
    pendingDonationLogs,
  } = await getAdminStats();

  const pending = [
    {
      label: "Pending Volunteers",
      count: pendingVolunteers,
      icon: <HeartHandshake className="w-6 sm:w-8 text-sky-800" />,
      href: "/admin/manage-users",
    },
    {
      label: "Pending Donors",
      count: pendingDonors,
      icon: <User className="w-6 sm:w-8 text-sky-800" />,
      href: "/admin/manage-users",
    },
    {
      label: "Review Projects",
      count: pendingProjects,
      icon: <ClipboardList className="w-6 sm:w-8 text-sky-800" />,
      href: "/admin/review-projects",
    },
    {
      label: "Review Donation",
      count: pendingDonationLogs,
      icon: <HandCoins className="w-6 sm:w-8 text-sky-800" />,
      href: "/admin/donation-logs",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pending.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`${
            item.count ? "bg-pink-200" : "bg-sky-100"
          } p-3 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition`}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-sky-200 p-2 sm:p-3 rounded-full">{item.icon}</div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">{item.label}</h3>
              <p className="text-xl sm:text-3xl font-bold">{item.count}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PendingReqCard;
