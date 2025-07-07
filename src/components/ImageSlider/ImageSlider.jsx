"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const images = [
  {
    src: "https://res.cloudinary.com/dntewbvod/image/upload/v1751085899/winter-cloths-donation_ipqg62.jpg",
    caption: "Winter Cloths Distribution",
  },
  {
    src: "https://res.cloudinary.com/dntewbvod/image/upload/v1751085900/orphane-children-donation_ijnf9p.jpg",
    caption: "Orphans Deserve Optimism",
  },
  {
    src: "https://res.cloudinary.com/dntewbvod/image/upload/v1751085902/disability-donation_qoo1ib.png",
    caption: "Aid for Disables",
  },
  {
    src: "https://res.cloudinary.com/dntewbvod/image/upload/v1751085899/sponsor-orphan-donation_e6o0i9.jpg",
    caption: "Sponsor One Child",
  },
  {
    src: "https://res.cloudinary.com/dntewbvod/image/upload/v1751103501/Feni-Photo-flood_cn97e4.jpg",
    caption: "Stay Beside the Flood Affected People",
  },
];

const ImageSlider = () => {
  return (
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[calc(60vh-52px)] md:h-[calc(80vh-52px)] lg:h-[calc(100vh-76px)] relative">
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute z-20 top-0 left-0 h-full w-full bg-black/30"></div>
              <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded w-full text-center">
                <h2 className="text-white text-2xl md:text-3xl lg:text-6xl font-bold">{image.caption}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default ImageSlider;
