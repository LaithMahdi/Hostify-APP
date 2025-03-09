"use client";
import React, { useState } from "react";
import { z } from "zod";

import { Room, roomSchema } from "./schema";
import InitialInformation from "./initial-information";
import EquipmentSection from "./equipement-section";
import ImageSection from "./image-section";

const page = () => {
  const [validationErrors, setValidationErrors] = useState<z.ZodIssue[]>([]);

  const [formData, setFormData] = useState<Room>({
    roomNumber: "",
    type: "",
    pricePerNight: 0,
    description: "",
    status: "",
    capacity: 1,
    hasBalcony: false,
    isActive: true,
    equipment: [],
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

  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = roomSchema.safeParse(formData);

    console.log("result", result);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 w-full">
      <div className="md:col-span-5">
        <InitialInformation
          formData={formData}
          updateForm={handleFormChange}
          errors={getErrorsForSection([
            "roomNumber",
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
    // </section>
  );
};

export default page;
