"use client";

import BreadCrumbList from "@/components/shared/bread-crumb-list";
import FormCreate from "./_components/form-create";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
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

      <FormCreate />
    </section>
  );
};

export default page;
