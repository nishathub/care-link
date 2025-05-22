import Link from "next/link";

const NavMiddle = () => {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-md menu-horizontal px-1 uppercase tracking-wider">
        <li>
          <Link href={"/ongoing-cases"}>Ongoing Cases</Link>
        </li>
        <li>
          <Link href={"/impact-stories"}>Impact Stories</Link>
        </li>
        <li>
          <Link href={"/news-update"}>News</Link>
        </li>
        <li>
          <details>
            <summary className="">Get Involved</summary>
            <ul className="w-42 bg-sky-800 right-0 capitalize tracking-normal">
              <li>
                <Link href={"/sign-volunteer"}>Become a Volunteer</Link>
              </li>
              <li>
                <Link href={"/sign-donor"}>Become a Donor</Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <Link className="btn btn-sm btn-primary" href={"/donate-now"}>Donate Now</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMiddle;
