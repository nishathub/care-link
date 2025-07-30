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
        <Link
          className="btn font-cinzel btn-outline btn-sm sm:btn-md"
          href={"/admin/dashboard"}
        >
          Dashboard
        </Link>
      );
    } else if (user?.role === "volunteer") {
      return (
        <Link
          className="btn font-cinzel btn-outline btn-sm sm:btn-md"
          href={"/volunteer/dashboard"}
        >
          Dashboard
        </Link>
      );
    }
  };

  if (isUserLoading) {
    return (
      <div className="navbar-end">
        <CustomLoading />
      </div>
    );
  }
  return (
    <div className="navbar-end">
      {user ? (
        userButton()
      ) : (
        <Link
          className="btn font-cinzel btn-outline btn-sm sm:btn-md"
          href={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default NavEnd;
