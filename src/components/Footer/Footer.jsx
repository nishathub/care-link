import CareLinkLogo from "../Logo/CareLinkLogo";

const Footer = () => {
  return (
    <footer className="bg-sky-700">
      <div className="max-w-7xl mx-auto footer sm:footer-horizontal py-10 px-4 sm:px-0 text-[14px]">
        <aside className="h-full flex items-center">
          <CareLinkLogo></CareLinkLogo>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Livelihood</a>
          <a className="link link-hover">Housing</a>
          <a className="link link-hover">Education</a>
        </nav>
        <nav>
          <h6 className="footer-title">Foundation</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title">Policy</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
      </div>
      <div className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            © Care Link {new Date().getFullYear()} 
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
