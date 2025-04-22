"use client";

import GuestHouseSection from "./_components/guest-house-section";
import HeroSlider from "./_components/hero-slider";
import RoomsSection from "./_components/rooms-section";

const page = () => {
  return (
    <div>
      <HeroSlider />
      <GuestHouseSection />
      <RoomsSection />
    </div>
  );
};

export default page;
