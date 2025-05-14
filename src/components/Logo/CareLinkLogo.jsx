import Image from "next/image";
import careLinkLogo from "../../../public/careLinkLogo.png";
import Link from "next/link";

const CareLinkLogo = () => {
  return (
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
  );
};

export default CareLinkLogo;
