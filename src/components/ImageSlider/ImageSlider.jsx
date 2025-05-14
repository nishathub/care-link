"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const images = [
  {
    src: "https://t4.ftcdn.net/jpg/03/20/40/93/360_F_320409321_niyM6DAO166WLJuEX8EOXCMvWwKSWDfA.jpg",
    caption: "Slide 1",
  },
  {
    src: "https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs=",
    caption: "Slide 2",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D",
    caption: "Slide 3",
  },
  {
    src: "https://www.habitatla.org/wp-content/uploads/group-shot1.jpg",
    caption: "Slide 4",
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
            <div className="w-full h-[400px] lg:h-[650px] relative ">
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute z-20 top-0 left-0 h-full w-full bg-black/30"></div>
              <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded">
                <h2 className="text-white text-6xl font-bold ">{image.caption}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  );
};

export default ImageSlider;
