import NavLinks from "./NavLinks";

const NavMiddle = () => {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-md menu-horizontal px-1 uppercase tracking-wider items-center">
        <NavLinks></NavLinks>
      </ul>
    </div>
  );
};

export default NavMiddle;
