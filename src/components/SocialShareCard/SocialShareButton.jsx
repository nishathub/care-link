"use client";

import { useState } from "react";
import SocialShareCard from "./SocialShareCard";
import { Share2 } from "lucide-react";

const SocialShareButton = () => {
  const [isShareCardActive, setShareCardActive] = useState(false);
  return (
    <div className="relative">
      <div
        className={`${
          isShareCardActive
            ? "translate-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        } absolute z-20 right-0 -top-20 transition-all duration-300`}
      >
        {isShareCardActive && <SocialShareCard />}
      </div>
      <button
        className="btn font-cinzel btn-xs sm:btn-sm bg-sky-800 hover:bg-sky-700 text-white"
        onClick={() => setShareCardActive(!isShareCardActive)}
      >
        <Share2 className="w-4" /> Share
      </button>
    </div>
  );
};

export default SocialShareButton;
