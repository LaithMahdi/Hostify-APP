"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { DataType } from "../page";
import apiClient from "@/lib/api-client";
import { Item } from "@/app/(public)/_components/rooms-section";
import BookingClientsSection from "./_components/booking-clients-section";
import BookingAppointment from "./_components/booking-appointment";
import { useState } from "react";
import { Reservation } from "./_components/types";
import { Button } from "@/components/ui/button";
import { useAddReservation } from "./_components/mutation/use-add-reservation";
import { reservationSchema } from "./_components/schema";
import { toast } from "@/hooks/use-toast";

const page = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const addReservation = useAddReservation();
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

  const handleAddReservation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = reservationSchema.safeParse(formData);

    if (!result.success) {
      setValidationErrors(result.error.issues);
      return;
    }

    setLoading(true);
    try {
      addReservation.mutate(result.data);
      toast({
        title: "Succes",
        description: "Reservation created successfully",
      });
      router.push(`/`);
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

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-7 container py-28">
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
      <div className="flex justify-end gap-3 col-span-2">
        <Button
          variant="outline"
          loading={loading}
          onClick={() => router.push(`/room/detail/${id}`)}
        >
          back to list
        </Button>
        <Button
          variant="primary"
          loading={loading}
          onClick={handleAddReservation}
        >
          {loading ? "Loading..." : "Book Now"}
        </Button>
      </div>
    </section>
  );
};

export default page;
