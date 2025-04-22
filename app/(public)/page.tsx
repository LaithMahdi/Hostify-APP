"use client";

import GuestHouseSection from "./_components/guest-house-section";
import HeroSlider from "./_components/hero-slider";
import RoomsSection from "./_components/rooms-section";

const page = () => {
  return (
    <>
      <HeroSlider />
      <GuestHouseSection />
      <RoomsSection />
    </>
  );
};

export default page;
