"use client";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import { useParams } from "next/navigation";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../../page";
import FormUpdate from "./_components/form-update";

const Page = () => {
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
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Rooms", href: "/room" },
          { label: "Update", href: "/room/update" },
          { label: `${id}`, href: `/rooms/update/${id}` },
        ]}
      />
      {data && <FormUpdate item={data.data} />}
    </section>
  );
};

export default Page;

export type DataType = {
  data: Item;
};
