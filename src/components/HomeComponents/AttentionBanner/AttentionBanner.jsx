import Link from "next/link";
import React from "react";
import "./AttentionBanner.css";

const AttentionBanner = () => {
  return (
    <div
      className="hero min-h-screen relative overflow-hidden custom-hero"
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content flex-wrap-reverse">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl lg:text-5xl font-bold capitalize">
            Bring smile to the sad faces
          </h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href={"/donate-now"} className="btn btn-primary w-48">
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
