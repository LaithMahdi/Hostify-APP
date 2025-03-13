"use client";
import { useState } from "react";
import { z } from "zod";
import { Room, roomSchema } from "./_components/schema";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import ImageSection from "./_components/image-section";
import EquipmentSection from "./_components/equipement-section";
import InitialInformation from "./_components/initial-information";
import { toast } from "@/hooks/use-toast";
import { useAddRoom } from "./_components/mutation/use-add-room";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);
  const [formData, setFormData] = useState<Room>({
    roomNumber: 0,
    type: "",
    pricePerNight: 0,
    description: "",
    status: "",
    capacity: 1,
    hasBalcony: false,
    isActive: true,
    equipements: [],
    images: [],
  });

  const getErrorsForSection = (fields: string | string[]) => {
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    return validationErrors.filter((error) =>
      fieldArray.includes(String(error.path[0]))
    );
  };

  const addMutation = useAddRoom();

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
      addMutation.mutate(result.data);
      toast({
        title: "Succes",
        description: "Guest house created successfully",
      });
      handleReset();
      router.push("/room");
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

  const handleReset = () => {
    setFormData({
      roomNumber: 0,
      type: "",
      pricePerNight: 0,
      description: "",
      status: "",
      capacity: 1,
      hasBalcony: false,
      isActive: true,
      equipements: [],
      images: [],
    });
    setValidationErrors([]);
  };

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full">
      <div className="flex flex-row gap-2 justify-between w-full">
        <div className="flex flex-col">
          <BreadCrumbList
            breadCrumbs={[
              { label: "Dashboard", href: "/" },
              { label: "Room", href: "/room" },
              { label: "Create", href: "/room/create" },
            ]}
          />

          <h1 className="text-3xl font-semibold mb-3">Create Room</h1>
        </div>
        <Button onClick={(e) => handle(e)} variant="primary" loading={loading}>
          Create
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
              "description",
              "status",
              "capacity",
              "hasBalcony",
              "isActive",
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

export default page;
