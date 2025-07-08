import Image from "next/image";
import careLinkLogo from "../../../public/careLinkLogo.png";

const CustomLoading = ({
  size = 32,
  color = "border-white",
  borderWidth = "border-t-4",
  className = "",
}) => {
  const sizeInPixels = `${size}px`;
  const logoSize = `${size - 12}px`;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: sizeInPixels,
        height: sizeInPixels,
      }}
    >
      {/* Spinning border */}
      <div
        className={`absolute inset-0 rounded-full border ${color} ${borderWidth} animate-spin`}
      ></div>

      {/* Static logo */}
      <div
        style={{
          width: logoSize,
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center"
      >
        <Image src={careLinkLogo} alt="CareLink-Logo"></Image>
      </div>
    </div>
  );
};

export default CustomLoading;
