"use client";

import {
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnTelegram,
  shareOnTwitter,
  shareOnWhatsApp,
} from "@/utils/SocialShare";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialShareCard = () => {
  const SocialIconButton = ({ onClick, Icon }) => {
    return (
      <button className="flex items-center" onClick={onClick}>
        <p className="w-8 h-8  rounded-full flex items-center justify-center border hover:bg-sky-700 hover:text-white transition cursor-pointer">
          <Icon />
        </p>
      </button>
    );
  };

  return (
    <div className="flex gap-2 p-2 bg-sky-100 rounded-lg shadow-xl">
      <SocialIconButton onClick={shareOnFacebook} Icon={FaFacebookF} />
      <SocialIconButton onClick={shareOnTwitter} Icon={FaXTwitter} />
      <SocialIconButton onClick={shareOnWhatsApp} Icon={FaWhatsapp} />
      <SocialIconButton onClick={shareOnTelegram} Icon={FaTelegramPlane} />
      <SocialIconButton onClick={shareOnLinkedIn} Icon={FaLinkedinIn} />
    </div>
  );
};

export default SocialShareCard;
