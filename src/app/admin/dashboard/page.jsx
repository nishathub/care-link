import AdminStatsCard from "@/components/Dashboard/AdminComponents/AdminStatsCard";
import PendingReqCard from "@/components/Dashboard/AdminComponents/PendingReqCard";
import RecentDonationTable from "@/components/Dashboard/AdminComponents/RecentDonationTable";
import TopDashboard from "@/components/Dashboard/AdminComponents/TopDashboard";

const AdminDashboard = () => {
  return (
    <main className="flex flex-col p-6 md:p-10 w-full bg-gray-300 text-gray-800 rounded-lg">
      {/* Top Dashboard */}
      <TopDashboard />

      {/* Stats Cards */}
      <AdminStatsCard />

      {/* Pending Requests Cards */}
      <PendingReqCard />

      {/* Recent Donations Table */}
      <RecentDonationTable />
    </main>
  );
};

export default AdminDashboard;
