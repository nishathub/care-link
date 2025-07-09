export const dynamic = 'force-dynamic';

import AdminStatsCard from "@/components/Dashboard/AdminComponents/AdminStatsCard";
import PendingReqCard from "@/components/Dashboard/AdminComponents/PendingReqCard";
import TopDashboard from "@/components/Dashboard/AdminComponents/TopDashboard";

const AdminDashboard = async () => {
  return (
    <main className="mt-12 lg:mt-0 flex flex-col p-6 md:p-10 w-full bg-gray-300 text-gray-800 rounded-lg">
      <TopDashboard />
      <div className="max-h-[calc(100vh-220px)] overflow-auto">
        <AdminStatsCard />
        <PendingReqCard />
      </div>
    </main>
  );
};

export default AdminDashboard;
