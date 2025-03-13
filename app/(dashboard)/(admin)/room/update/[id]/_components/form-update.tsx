"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import InitialInformation from "./initial-information";
import EquipmentSection from "./equipement-section";
import ImageSection from "./image-section";
import { useUpdateRoom } from "./mutation/use-update-room";
import { roomSchema } from "./schema";

const FormUpdate = () => {
  const { id } = useParams();

  // Fetch existing room data
  const { isFetching, data } = useQuery({
    queryKey: ["room-by-id", id],
    queryFn: () => apiClient.get(`/api/v1/room/${id}`).then((res) => res.data),
  });

  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const item = data?.data;

  const [formData, setFormData] = useState({
    roomNumber: item?.roomNumber ?? 0,
    type: item?.type ?? "",
    pricePerNight: item?.pricePerNight ?? 0,
    status: item?.status ?? "",
    capacity: item?.capacity ?? 0,
    hasBalcony: item?.hasBalcony ?? false,
    isActive: item?.isActive ?? false,
    description: item?.description ?? "",
    equipment: item?.equipment ?? [],
    images: item?.images ? item.images.map((image) => image.url) : [],
  });

  useEffect(() => {
    if (item) {
      setFormData({
        roomNumber: item.roomNumber,
        type: item.type,
        pricePerNight: item.pricePerNight,
        status: item.status,
        capacity: item.capacity,
        hasBalcony: item.hasBalcony,
        isActive: item.isActive,
        description: item.description,
        equipment: item.equipment,
        images: item?.images ? item.images.map((image) => image.url) : [],
      });
    }
  }, [item]);

  const updateMutation = useUpdateRoom({ id: Number(id) });

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
      const result = roomSchema.safeParse(formData);
  
      if (!result.success) {
        setValidationErrors(result.error.issues);
        return;
      }
  
      setLoading(true);
      try {
        updateMutation.mutate(result.data);
        toast({
          title: "Success",
          description: "room updated successfully",
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
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <div className="flex flex-row gap-2 justify-between w-full">
        <h1 className="text-3xl font-semibold mb-3">Update Room</h1>
        <Button onClick={handle} variant="primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 w-full">
        <div className="md:col-span-5">
          <InitialInformation
            formData={formData}
            updateForm={handleFormChange}
            errors={getErrorsForSection([
              "roomNumber",
              "type",
              "pricePerNight",
              "status",
              "capacity",
              "hasBalcony",
              "isActive",
              "description",
            ])}
          />
        </div>
        <div className="md:col-span-3">
          <EquipmentSection
            formData={formData}
            updateForm={handleFormChange}
            errors={getErrorsForSection(["equipment"])}
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

export default FormUpdate;
