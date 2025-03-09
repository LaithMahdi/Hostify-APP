import { z } from "zod";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { CheckCircle } from "lucide-react";

interface Props {
  formData: any;
  updateForm: (path: string, value: any) => void;
  errors: z.ZodIssue[];
}

const EquipmentSection = ({ formData, errors, updateForm }: Props) => {
  const { data } = useQuery<DataType>({
    queryKey: ["equipment-list"],
    queryFn: async () => {
      const response = await apiClient.get(`/equipment/all`);
      return response.data;
    },
  });

  const [ids, setIds] = useState<number[]>(
    formData.equipments?.map((equipment: { id: number }) => equipment.id) || []
  );

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path.includes(field));
    return error ? error.message : "";
  };

  const updateEquipments = (id: number) => {
    const newIds = ids.includes(id)
      ? ids.filter((equipmentId) => equipmentId !== id)
      : [...ids, id];

    setIds(newIds);
    updateForm(
      "equipments",
      newIds.map((equipId) => ({ id: equipId }))
    );
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg w-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold">Select Equipment</h1>
        <p className="text-gray-500 text-sm">
          Select the equipment you want to add to this room
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="equipment" className="text-slate-500 font-normal">
          Equipments
          <span className="text-base font-semibold text-red-500">*</span>
        </Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.data?.map((equipment) => (
          <div
            key={equipment.id}
            className={`flex flex-row items-center space-x-4 p-4 border rounded-lg cursor-pointer ${
              ids.includes(equipment.id) ? "bg-blue-50 border-blue-500" : ""
            }`}
            onClick={() => updateEquipments(equipment.id)}
          >
            <CheckCircle className="size-10 text-mainColor" />
            <div>
              <p className="text-lg font-semibold">{equipment.name}</p>
              <p className="text-sm font-normal text-neutral-500">
                {equipment.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {getErrorMessage("equipments") && (
        <p className="text-red-500 text-sm">{getErrorMessage("equipments")}</p>
      )}
    </div>
  );
};

export default EquipmentSection;

export type DataType = {
  data: Array<{
    id: number;
    name: string;
    icon: string;
    description: string;
    isActive: boolean;
  }>;
};
