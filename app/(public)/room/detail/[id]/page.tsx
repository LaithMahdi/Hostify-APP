"use client";
import { Item } from "@/app/(public)/_components/rooms-section";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
  return (
    <div className="container py-28">
      {/* <HeroSlider className="max-h-screen" /> */}
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default page;

export type DataType = {
  data: Item;
};
