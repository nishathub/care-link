import Link from "next/link";
import CareLinkLogo from "../Logo/CareLinkLogo";
import NavLinks from "./NavLinks";

const NavStart = () => {
  return (
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-md dropdown-content bg-sky-700 rounded-box z-10 mt-3 w-52 p-2 shadow capitalize"
        >
         <NavLinks></NavLinks>
        </ul>
      </div>
      <CareLinkLogo></CareLinkLogo>
    </div>
  );
};

export default NavStart;
