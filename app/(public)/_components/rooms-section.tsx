import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import RoomCard from "./room-card";

const ITEMS_PER_PAGE = 10;

const RoomsSection = () => {
  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["rooms"],
    queryFn: () => apiClient.get(`/room/all`),
  });

  if (isFetching) return <>loading...</>;

  return (
    <section className="py-24">
      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <p className="font-tertiary uppercase text-[15px] tracking-[6px]">
            Just Enjoy & Relax
          </p>
          <h2 className="font-primary text-[45px] mb-6">Room & Suites</h2>
        </div>

        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {data?.data.data.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;

export type DataType = {
  data: {
    data: Array<Item>;
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
    totalItems: number;
  };
};

export type Item = {
  id: number;
  roomNumber: number;
  type: string;
  pricePerNight: number;
  status: string;
  capacity: number;
  hasBalcony: boolean;
  description?: string;

  images: Array<{
    id: number;
    url: string;
  }>;
  equipment: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
