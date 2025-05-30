import Link from "next/link";

const NavEnd = () => {
  return (
    <div className="navbar-end">
      <Link className="btn btn-outline" href={"/auth/login"}>
        Login
      </Link>
    </div>
  );
};

export default NavEnd;
