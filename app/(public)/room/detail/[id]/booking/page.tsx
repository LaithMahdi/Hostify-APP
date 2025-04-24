"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DataType } from "../page";
import apiClient from "@/lib/api-client";
import { Item } from "@/app/(public)/_components/rooms-section";

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

  return <section className="container py-28"></section>;
};

export default page;
