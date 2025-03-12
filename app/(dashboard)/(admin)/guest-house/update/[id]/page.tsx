"use client";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { GuestHouse, guestHouseSchema } from "./_components/schema";
import InitialInformation from "./_components/initial-information";
import ImageSection from "./_components/image-section";
import ContactSection from "./_components/contact-section";
import RoomSection from "./_components/room-section";
import { Button } from "@/components/ui/button";
import { useUpdateGuestHouse } from "./_components/mutation/use-update-guest-house";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ContactType } from "./_components/types";

const page = () => {
  const { id } = useParams();

  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["guest-house-by-id", id],
    queryFn: () => apiClient.get(`/guest-house/${id}`),
  });

  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const item = data?.data.data;

  const [formData, setFormData] = useState<GuestHouse>({
    name: item?.name ?? "",
    address: item?.address ?? "",
    region: item?.region ?? "",
    description: item?.description ?? "",
    hasParking: item?.hasParking ?? false,
    isPetFriendly: item?.isPetFriendly ?? false,
    contacts: item?.contacts ?? [],
    rooms: item?.rooms.map((room: { id: number }) => room.id) ?? [],
    images: item?.images.map((image: { url: string }) => image.url) ?? [],
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        address: item.address,
        region: item.region,
        description: item.description,
        hasParking: item.hasParking,
        isPetFriendly: item.isPetFriendly,
        contacts: item.contacts,
        rooms: item.rooms.map((room: { id: number }) => room.id),
        images: item.images.map((image: { url: string }) => image.url),
      });
    }
  }, [item]);

  const updateMutation = useUpdateGuestHouse({ id: Number(id) });

  const getErrorsForSection = (fields: string | string[]) => {
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    return validationErrors.filter((error) =>
      fieldArray.includes(String(error.path[0]))
    );
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      key.split(".").reduce((acc: any, key, index, array) => {
        if (index === array.length - 1) {
          acc[key] = value;
        }
        return acc[key];
      }, newFormData);
      console.log("newFormData", newFormData);
      return newFormData;
    });
  };

  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = guestHouseSchema.safeParse(formData);

    if (!result.success) {
      setValidationErrors(result.error.issues);
      return;
    }

    setLoading(true);
    try {
      updateMutation.mutate(result.data);
      toast({
        title: "Success",
        description: "Guest house updated successfully",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "success",
      });
      setLoading(true);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full ">
      <div className="flex flex-row gap-2 justify-between w-full">
        <div className="flex flex-col">
          <BreadCrumbList
            breadCrumbs={[
              { label: "Dashboard", href: "/" },
              { label: "Guest house", href: "/guest-house" },
              { label: "Update", href: "/guest-house/update" },
              { label: `${id}`, href: `/guest-house/update/${id}` },
            ]}
          />

          <h1 className="text-3xl font-semibold mb-3">Update Guest House</h1>
        </div>
        <Button onClick={(e) => handle(e)} variant="primary" loading={loading}>
          Update
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 w-full">
        <div className="md:col-span-5">
          <InitialInformation
            formData={formData}
            updateForm={handleFormChange}
            errors={getErrorsForSection([
              "name",
              "address",
              "region",
              "description",
              "hasParking",
              "isPetFriendly",
            ])}
          />
        </div>
        <div className="md:col-span-3">
          <ContactSection
            formData={formData}
            updateForm={handleFormChange}
            errors={getErrorsForSection(["contacts"])}
          />
        </div>
        <div className="md:col-span-8">
          <RoomSection
            formData={formData}
            updateForm={handleFormChange}
            errors={getErrorsForSection(["rooms"])}
          />
        </div>
        <div className="md:col-span-8">
          <ImageSection
            formData={formData}
            updateForm={handleFormChange}
            errors={getErrorsForSection(["images"])}
          />
        </div>
      </div>
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
  contacts: Array<{
    id: number;
    type: ContactType;
    value: string;
  }>;
  createdAt: string;
};
