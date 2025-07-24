import SideNavbar from "@/components/Dashboard/SideNavbar/SideNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-sky-900">
      {/* Fixed Sidebar */}
      <SideNavbar></SideNavbar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto px-4 pt-16 pb-8 lg:pt-8 lg:px-0 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
