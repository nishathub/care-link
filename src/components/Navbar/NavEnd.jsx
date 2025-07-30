"use client";
import useUserStore from "@/lib/zustand/userStore";
import Link from "next/link";
import CustomLoading from "../CustomLoading/CustomLoading";

const NavEnd = () => {
  const user = useUserStore((state) => state?.user);
  const isUserLoading = useUserStore((state) => state?.isUserLoading);

  const userButton = () => {
    if (user?.role === "admin") {
      return (
        <Link className="btn btn-outline" href={"/admin/dashboard"}>
          Dashboard
        </Link>
      );
    } else if (user?.role === "volunteer") {
      return (
        <Link className="btn btn-outline" href={"/volunteer/dashboard"}>
          Dashboard
        </Link>
      );
    }
  };

  if (isUserLoading) {
    return (
      <div className="navbar-end">
        <CustomLoading/>
      </div>
    );
  }
  return (
    <div className="navbar-end">
      {user ? (
        userButton()
      ) : (
        <Link className="btn btn-outline btn-sm sm:btn-md" href={"/login"}>
         <p className="font-cinzel tracking-wider">Login</p> 
        </Link>
      )}
    </div>
  );
};

export default NavEnd;
