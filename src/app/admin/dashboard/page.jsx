
import AdminStats from "@/components/Dashboard/AdminComponents/AdminStats";
import TopDashboard from "@/components/Dashboard/AdminComponents/TopDashboard";
import { UserCheck, ClipboardList } from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  // Example data
  const stats = [
    { label: "Total Donations", value: "$25,400" },
    { label: "Active Volunteers", value: "320" },
    { label: "Pending Reviews", value: "12" },
  ];

  const recentDonations = [
    {
      id: 1,
      donor: "John Doe",
      amount: "$200",
      date: "2025-07-02",
      status: "Completed",
    },
    {
      id: 2,
      donor: "Jane Smith",
      amount: "$150",
      date: "2025-07-01",
      status: "Pending",
    },
    {
      id: 3,
      donor: "Robert Johnson",
      amount: "$500",
      date: "2025-06-30",
      status: "Completed",
    },
  ];

  const pending = [
    {
      label: "Pending Volunteers",
      count: 8,
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      href: "/admin/manage-users",
    },
    {
      label: "Pending Projects",
      count: 4,
      icon: <ClipboardList className="w-8 h-8 text-blue-600" />,
      href: "/admin/review-projects",
    },
  ];

  return (
    <main className="flex flex-col p-6 md:p-10 w-full bg-gray-300 text-gray-800 rounded-lg">
      {/* Top Dashboard */}
      <TopDashboard />

      {/* Stats Cards */}
      <AdminStats />
      

       {/* Pending Requests Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {pending.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between bg-sky-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{item.label}</h3>
                <p className="text-2xl font-bold">{item.count}</p>
              </div>
            </div>
            <span className="text-sm underline">View</span>
          </Link>
        ))}
      </div>

      {/* Recent Donations Table */}
      <div className="bg-sky-100 p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Donor</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentDonations.map((donation) => (
              <tr key={donation.id} className="border-b">
                <td className="py-2 px-4">{donation.id}</td>
                <td className="py-2 px-4">{donation.donor}</td>
                <td className="py-2 px-4">{donation.amount}</td>
                <td className="py-2 px-4">{donation.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      donation.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="text-blue-100 hover:underline text-xs">
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminDashboard;
