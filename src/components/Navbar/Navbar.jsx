import NavMiddle from "./NavMiddle";
import NavEnd from "./NavEnd";
import NavStart from "./NavStart";

const Navbar = () => {
  return (
    <nav className="text-white fixed z-50 w-full top-0 shadow-xl bg-gradient-to-r to-sky-700 backdrop-blur-md">
      <div className="navbar max-w-7xl h-16 lg:h-20 mx-auto">
        <NavStart></NavStart>
        <NavMiddle></NavMiddle>
        <NavEnd></NavEnd>
      </div>
    </nav>
  );
};

export default Navbar;
