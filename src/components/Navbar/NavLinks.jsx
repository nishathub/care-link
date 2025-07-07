"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    const pathName = usePathname();
  return (
    <>
      <li>
        <Link className={`${pathName === "/ongoing-cases" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/ongoing-cases"}>Ongoing Projects</Link>
      </li>
      <li>
        <Link className={`${pathName === "/impact-stories" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/impact-stories"}>Impact Stories</Link>
      </li>
      <li>
        <Link className={`${pathName === "/news-updates" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/news-updates"}>News</Link>
      </li>
      <li>
        <details>
          <summary className="">Get Involved</summary>
          <ul className="w-42 bg-sky-800 right-0 capitalize tracking-normal">
            <li>
              <Link className={`${pathName === "/register-volunteer" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/register-volunteer"}>Become a Volunteer</Link>
            </li>
            <li>
              <Link className={`hidden ${pathName === "/register-donor" ? "text-pink-400 underline underline-offset-4" : ""}`} href={"/register-donor"}>Become a Donor</Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
};

export default NavLinks;
