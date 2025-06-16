'use client';
import useUserStore from "@/lib/zustand/userStore";
import Link from "next/link";

const NavEnd = () => {
  const user = useUserStore((state)=> state?.user);
  return (
    <div className="navbar-end">
      {user ? 
      <Link className="btn btn-outline" href={"/admin/dashboard"}>
        Dashboard
      </Link>
      :
      <Link className="btn btn-outline" href={"/login"}>
        Login
      </Link>
    }
    </div>
  );
};

export default NavEnd;
