"use client";
import BreadCrumbList from "@/components/shared/bread-crumb-list";
import React, { useState } from "react";
import { z } from "zod";
import { GuestHouse, guestHouseSchema } from "./_components/schema";
import InitialInformation from "./_components/initial-information";
import ImageSection from "./_components/image-section";
import ContactSection from "./_components/contact-section";
import RoomSection from "./_components/room-section";

const page = () => {
  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);

  const [formData, setFormData] = useState<GuestHouse>({
    name: "",
    address: "",
    region: "",
    description: "",
    hasParking: false,
    isPetFriendly: false,
    contacts: [],
    rooms: [],
    images: [],
  });

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

  const handle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = guestHouseSchema.safeParse(formData);

    console.log("result", result);
  };

  return (
    <section className="flex flex-col items-start justify-start gap-2 w-full ">
      <BreadCrumbList
        breadCrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Guest house", href: "/guest-house" },
          { label: "Create", href: "/guest-house/create" },
        ]}
      />

      <h1 className="text-3xl font-semibold mb-3">Create Guest House</h1>
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
