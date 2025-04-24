"use client";
import { Item } from "@/app/(public)/_components/rooms-section";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import RoomSlider from "./_components/room-slider";
import { MapPin, PawPrint, SquareParking, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  const params = useParams();
  const id = params?.id as string;

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["room-by-id", id],
    queryFn: async () => {
      if (!id) throw new Error("Room ID is missing");
      const response = await apiClient.get(`/room/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const room: Item = data?.data as Item;

  return (
    <section className="container py-28">
      <div className="bg-[url(../public/hero/1.jpg)] h-[560px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          Room {room.roomNumber}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="text-xl font-semibold">
              Room Number:
              <span className="font-medium space-x-1">{room.roomNumber}</span>
            </h2>
            <p className="mt-1 mb-6 text-gray-700">{room.description}</p>

            <RoomSlider images={room.images} />

            <div className="mt-12">
              <h3 className="h3 mb-3"></h3>
              <p className="mb-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis accusantium sapiente quas quos explicabo, odit
                nostrum? Reiciendis illum dolor eos dicta. Illum vero at hic
                nostrum sint et quod porro.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-12">
                {room.equipment.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-3 flex-1 border border-gray-200 rounded-lg p-4"
                  >
                    <img
                      key={index}
                      className="size-8 object-cover"
                      src={item.url}
                      alt={`${item.name}-equipment`}
                    />
                    <div className="text-base font-medium">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[40%] h-full">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-2 text-lg">
                <h3 className="font-semibold">Guest House: </h3>
                <p>{room.guestHouse.name}</p>
              </div>
              <p className="text-sm text-gray-700">
                {room.guestHouse.description}
              </p>
              <div className="flex items-center gap-x-1">
                <MapPin className="text-mainColor size-6" />
                <p className="text-sm text-gray-700">
                  {room.guestHouse.address}, {room.guestHouse.region}
                </p>
              </div>
              <div className="flex items-center gap-x-1">
                <Star className="text-mainColor size-6" />
                <p className="text-sm text-gray-700">
                  {room.guestHouse.rating} / 5.0
                </p>
              </div>
              <div className="flex items-center gap-x-1">
                <PawPrint className="text-mainColor size-6" />
                <p className="text-sm text-gray-700">
                  {room.guestHouse.isPetFriendly ? "Pet Friendly" : "No Pets"}
                </p>
              </div>
              <div className="flex items-center gap-x-1">
                <SquareParking className="text-mainColor size-6" />
                <p className="text-sm text-gray-700">
                  {room.guestHouse.hasParking
                    ? "Parking Available"
                    : "No Parking"}
                </p>
              </div>

              <Button variant="primary" size="lg" className="w-full mt-4">
                book now for ${room.pricePerNight} / night
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

export type DataType = {
  data: Item;
};
