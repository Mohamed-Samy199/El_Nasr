import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./Facilityslider.css";

import FacilityCard from "./FacilityCard.jsx";

const SWIPER_CONFIG = {
  spaceBetween: 24,
  slidesPerView: 1.15,
  loop: true,
  speed: 700,
  centeredSlides: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 80,
    modifier: 2,
    slideShadows: false,
  },
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    640: { slidesPerView: 1.6, spaceBetween: 24, coverflowEffect: { modifier: 1.5 } },
    1024: { slidesPerView: 2.4, spaceBetween: 32, coverflowEffect: { modifier: 2 } },
  },
};


const FacilityCarousel = ({ images, isAr, onOpen }) => {
  return (
    <div className="facility-swiper relative px-10 sm:px-14 md:px-20" dir={isAr ? "rtl" : "ltr"}>
      <button
        className="facility-prev group absolute start-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-line flex items-center justify-center bg-card/90 backdrop-blur-md shadow-xl hover:bg-olive hover:border-olive transition-all duration-300"
        aria-label="Previous"
      >
        <ChevronRight
          size={22}
          className={`text-olive group-hover:text-paper transition-colors ${isAr ? "" : "icon-directional"}`}
        />
      </button>

      <button
        className="facility-next group absolute end-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-line flex items-center justify-center bg-card/90 backdrop-blur-md shadow-xl hover:bg-olive hover:border-olive transition-all duration-300"
        aria-label="Next"
      >
        <ChevronLeft
          size={22}
          className={`text-olive group-hover:text-paper transition-colors ${isAr ? "" : "icon-directional"}`}
        />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        navigation={{ prevEl: ".facility-prev", nextEl: ".facility-next" }}
        pagination={{
          el: ".facility-pagination",
          clickable: true,
          renderBullet: (index, className) => `<span class="${className} facility-bullet"></span>`,
        }}
        className="!pb-14"
        {...SWIPER_CONFIG}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <FacilityCard
              image={image}
              caption={isAr ? image.caption_ar : image.caption_en}
              onOpen={() => onOpen(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="facility-pagination flex items-center justify-center gap-2 mt-2" />
    </div>
  );
};

export default FacilityCarousel;