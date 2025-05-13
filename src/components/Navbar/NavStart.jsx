import Image from "next/image";
import careLinkLogo from "../../../public/careLinkLogo.png";
import Link from "next/link";

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
          className="menu menu-md dropdown-content bg-sky-800 rounded-box z-10 mt-3 w-52 p-2 shadow capitalize"
        >
          <li>
            <Link href={"/ongoing-cases"}>Ongoing Cases</Link>
          </li>
          <li>
            <Link href={"/impact-stories"}>Impact Stories</Link>
          </li>
          <li>
            <Link href={"/donate-now"}>Donate Now</Link>
          </li>
          <li>
            <details>
              <summary className="">
                Get Involved
              </summary>
              <ul className="w-42 bg-sky-800 right-0">
                <li>
                  <Link href={"/sign-volunteer"}>Become a Volunteer</Link>
                </li>
                <li>
                  <Link href={"/sign-donor"}>Become a Donor</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={careLinkLogo}
          className="w-8 lg:w-12"
          alt="CareLink-Logo"
        ></Image>
        <div className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          CareLink
        </div>
      </Link>
    </div>
  );
};

export default NavStart;
