import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import HuestHouseCard from "./guest-house-card";

const ITEMS_PER_PAGE = 6;

const GuestHouseSection = () => {
  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["guest-houses"],
    queryFn: () => apiClient.get(`/guest-house/all?limit=${ITEMS_PER_PAGE}`),
  });

  if (isFetching)
    return (
      <div className="container mx-auto lg:px-0 mt-24">
        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="w-full min-h-[530px]  " key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <section className="py-24">
      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <p className="font-tertiary uppercase text-[15px] tracking-[6px]">
            Guest House Booking
          </p>
          <h2 className="font-primary text-[45px] mb-6">Guest House</h2>
        </div>

        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {data?.data.data.map((guest) => (
            <HuestHouseCard key={guest.id} house={guest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestHouseSection;

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
  name: string;
  address: string;
  region: string;
  description: string;
  rating: number;
  hasParking: boolean;
  isPetFriendly: boolean;
  rooms: Array<{
    id: number;
  }>;
  images: Array<{
    id: number;
    url: string;
  }>;
  createdAt: string;
};
