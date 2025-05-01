"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";
import { DataType } from "../page";
import apiClient from "@/lib/api-client";
import { Item } from "@/app/(public)/_components/rooms-section";
import BookingClientsSection from "./_components/booking-clients-section";
import BookingAppointment from "./_components/booking-appointment";
import { useState } from "react";
import { Reservation } from "./_components/types";

const page = () => {
  const params = useParams();
  const id = params?.id as string;

  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<Reservation>({
    checkIn: "",
    checkOut: "",
    totalPrice: 0,
    roomId: id,
    members: [],
  });

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
      console.log("reservation Data", newFormData);
      return newFormData;
    });
  };

  return (
    <section className="flex flex-col lg:flex-row gap-7 container py-28">
      <BookingClientsSection
        formData={formData}
        updateForm={handleFormChange}
        errors={getErrorsForSection(["members"])}
      />
      <BookingAppointment
        data={room}
        formData={formData}
        updateForm={handleFormChange}
        errors={getErrorsForSection(["checkIn", "checkOut", "totalPrice"])}
      />
    </section>
  );
};

export default page;
