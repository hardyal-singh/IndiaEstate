import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCards, Zoom, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/zoom';
import 'swiper/css/autoplay';

const ImageSlider = ({ listing }) => {
  const swiperParams = {
    modules: [Navigation, Pagination, EffectCards, Zoom, A11y, Autoplay] ,
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      clickable: true,
      type: 'bullets',
      dynamicBullets: true,
    },
    effect: 'cards',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }, 
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: true,
    zoom: true,
  };

  return (
    <Swiper {...swiperParams}>
      {listing.imageUrls.map((url) => (
        <SwiperSlide key={url}>
          <div
            className="h-[550px] bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${url})` }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
