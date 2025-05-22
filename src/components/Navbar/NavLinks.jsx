"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    const pathName = usePathname();
  return (
    <>
      <li>
        <Link className={`${pathName === "/ongoing-cases" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/ongoing-cases"}>Ongoing Cases</Link>
      </li>
      <li>
        <Link className={`${pathName === "/impact-stories" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/impact-stories"}>Impact Stories</Link>
      </li>
      <li>
        <Link className={`${pathName === "/news-update" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/news-update"}>News</Link>
      </li>
      <li>
        <details>
          <summary className="">Get Involved</summary>
          <ul className="w-42 bg-sky-800 right-0 capitalize tracking-normal">
            <li>
              <Link className={`${pathName === "/sign-volunteer" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/sign-volunteer"}>Become a Volunteer</Link>
            </li>
            <li>
              <Link className={`${pathName === "/sign-donor" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/sign-donor"}>Become a Donor</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link className="btn btn-sm btn-primary mt-2 lg:mt-0" href={"/donate-now"}>
          Donate Now
        </Link>
      </li>
    </>
  );
};

export default NavLinks;
