import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";

interface Props {
  images: Array<{
    id: number;
    url: string;
  }>;
}

const RoomSlider = ({ images }: Props) => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="h[200px] md:h-[400px]"
    >
      {images.map(({ id, url }) => (
        <SwiperSlide key={id}>
          <img
            className="object-cover h-full w-full"
            src={url}
            alt={`${id}-room-slider`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoomSlider;
