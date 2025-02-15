"use client";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import { useParams } from "next/navigation";
import FormUpdate from "./_components/form-update";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const { id } = useParams();

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["equipments-by-id", id],
    queryFn: () => apiClient.get(`/equipment/${id}`),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Equipment", href: "/equipment" },
          { label: "Update", href: "/equipment/update" },
          { label: `${id}`, href: `/equipment/update/${id}` },
        ]}
      />

      <h1 className="text-3xl font-semibold mb-3">Update Equipment</h1>

      {data && <FormUpdate item={data.data.data} />}
    </section>
  );
};

export default page;

export type DataType = {
  data: {
    data: Item;
  };
};

export type Item = {
  id: number;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: string;
};
