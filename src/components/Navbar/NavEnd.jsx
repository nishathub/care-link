"use client";
import useUserStore from "@/lib/zustand/userStore";
import Link from "next/link";

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
        <p>loading..</p>
      </div>
    );
  }
  return (
    <div className="navbar-end">
      {user ? (
        userButton()
      ) : (
        <Link className="btn btn-outline" href={"/login"}>
          Login
        </Link>
      )}
    </div>
  );
};

export default NavEnd;
