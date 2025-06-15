import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import  './Swiper.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const SwiperSlider = () => {
  const sliderImages = [
    "https://img.freepik.com/free-vector/flat-design-shopping-center-twitch-banner-template_23-2149325471.jpg?t=st=1745301789~exp=1745305389~hmac=4cf6b277c3facfd9469ac2339c993d9b76a443dad15843c63895b3ec590e5802&w=1380",
    "https://img.freepik.com/free-vector/horizontal-banner-template-black-friday-sales_23-2150860326.jpg?t=st=1745301897~exp=1745305497~hmac=7da0e257200384c8fca8c0651fd5cb841a97bccfad8a380a345f55958b748cb7&w=1800",
    "https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg?t=st=1745303303~exp=1745306903~hmac=3a77f8252a643792d14bfca81d0654d8f2e9b9f8eb4ee1185dbbcf54c5047367&w=1380",
  ];
  return (
    <div className="swiper-container">
     <h1>SHOPING HERE</h1>
      {/* Swiper Banner */}
      <Swiper
        className="Swiper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index} className="SwiperSlide">
            <img src={img} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperSlider
