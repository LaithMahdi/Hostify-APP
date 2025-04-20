import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import { sliderData } from "./constants";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="h-screen"
    >
      {sliderData.map(({ id, title, bg, btnNext }) => (
        <SwiperSlide
          className="h-full relative flex justify-center items-center w-full"
          key={id}
        >
          <div className="absolute top-0 bottom-0 right-0 left-0 w-full h-full">
            <img className="object-cover h-full w-full" src={bg} alt="logo" />
          </div>
          <div className="absolute top-0 bottom-0 right-0 left-0 w-full h-full bg-black/70" />
          <div className="z-50 text-white text-center flex items-center justify-center absolute top-0 bottom-0 right-0 left-0 w-full h-full flex-col">
            <div className="uppercase font-tertiary tracking-[6px] mb-5">
              Just Enjoy & Relax
            </div>
            <h1 className="font-primary text-[32px] uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6">
              {title}
            </h1>
            <button className="btn btn-lg btn-primary mx-auto">
              {btnNext}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
