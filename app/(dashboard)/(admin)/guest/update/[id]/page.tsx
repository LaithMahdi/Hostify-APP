"use client";

import BreadCrumbList from "@/components/shared/bread-crumb-list";
import { useParams } from "next/navigation";
import apiClient from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../../page";
import FormUpdate from "./_components/form-update";

const page = () => {
  const { id } = useParams();

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["guest-by-id", id],
    queryFn: () => apiClient.get(`/client/${id}`),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Guest", href: "/guest" },
          { label: "Update", href: "/guest/update" },
          { label: `${id}`, href: `/guest/update/${id}` },
        ]}
      />

      <h1 className="text-3xl font-semibold mb-3">Update Guest</h1>

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
