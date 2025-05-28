"use client";

import SideNavbar from "@/components/Dashboard/SideNavbar/SideNavbar";


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-sky-900">
      {/* Fixed Sidebar */}
      <SideNavbar></SideNavbar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto px-2 pt-4 lg:pt-12 lg:px-0 max-w-7xl mx-auto w-full border">{children}</main>
      </div>
    </div>
  );
}

export default  DashboardLayout;