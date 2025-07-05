"use client";
import useUserStore from "@/lib/zustand/userStore";

const TopDashboard = () => {
  const user = useUserStore((state) => state?.user);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  if(isUserLoading){
    return <p className="mb-8">Loading...</p>
  }
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl text-sky-800 font-bold capitalize">
        {user?.role} Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <span className="font-medium text-sky-800 capitalize">
          {user?.role}
        </span>
        <img
          src={user?.imageLink}
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default TopDashboard;
