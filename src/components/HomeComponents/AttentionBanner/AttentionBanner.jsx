import Link from "next/link";
import React from "react";
import "./AttentionBanner.css";

const AttentionBanner = () => {
  return (
    <div className="hero min-h-[50vh] relative overflow-hidden custom-hero rounded-md">
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content flex-wrap-reverse">
        <div className="max-w-md">
          <h1 className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold capitalize">
            Bring smile to the sad faces
          </h1>
          <p className="mb-5">
            Every day, countless people around us silently carry heavy burdens.
            This is your chance to make a difference — to bring smiles to sad
            faces and hope to hearts that need it most.
          </p>
          <Link href={"/donate-now"} className="btn bg-sky-800 hover:bg-sky-700 text-white w-48">
            Donate Now
          </Link>
        </div>
        <img
          className="w-32 lg:w-60 rounded-full"
          src="https://donate.worldvision.ca/cdn/shop/products/fy21-philanthropy-Rohingya-refugee-girl-Jannatul_2x_28e140cf-70c7-4561-857c-125e57171fa8.jpg?v=1603484562"
          alt=""
        />
      </div>
    </div>
  );
};

export default AttentionBanner;
