import { Menu } from "lucide-react";
import CareLinkLogo from "../Logo/CareLinkLogo";
import NavLinks from "./NavLinks";

const NavStart = () => {
  return (
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="mx-2 btn btn-sm btn-ghost btn-neutral text-white rounded-lg lg:hidden">
          <Menu/>
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
