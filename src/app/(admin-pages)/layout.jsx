// app/dashboard/layout.jsx
"use client";

import SideNavbar from "@/components/Dashboard/SideNavbar/SideNavbar";


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen ">
      {/* Fixed Sidebar */}
      <SideNavbar></SideNavbar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

export default  DashboardLayout;