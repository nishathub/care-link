import NavMiddle from "./NavMiddle";
import NavEnd from "./NavEnd";
import NavStart from "./NavStart";

const Navbar = () => {
  return (
    <nav className="shadow-xl bg-gradient-to-r to-sky-700">
      <div className="navbar max-w-7xl mx-auto lg:h-20">
        <NavStart></NavStart>
        <NavMiddle></NavMiddle>
        <NavEnd></NavEnd>
      </div>
    </nav>
  );
};

export default Navbar;
