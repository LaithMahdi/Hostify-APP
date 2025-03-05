import { z } from "zod";
import { GuestHouse } from "./schema";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { BedSingle } from "lucide-react";

interface Props {
  formData: GuestHouse;
  updateForm: (path: string, value: any) => void;
  errors: z.ZodIssue[];
}

const RoomSection = ({ formData, errors, updateForm }: Props) => {
  const { isFetching, data } = useQuery<DataType>({
    queryKey: ["room-created-by"],
    queryFn: () => apiClient.get(`/room/my/`),
  });

  const [ids, setIds] = useState<number[]>(
    formData.rooms?.map((room) => room) || []
  );

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path.includes(field));
    return error ? error.message : "";
  };

  const updateRooms = (id: number) => {
    const newIds = ids.includes(id)
      ? ids.filter((roomId) => roomId !== id)
      : [...ids, id];

    setIds(newIds);
    updateForm(
      "rooms",
      newIds.map((id) => ({ id }))
    );
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg w-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold">Select Room</h1>
        <p className="text-gray-500 text-sm">
          Select the room you want to add to this guest house
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image" className="text-slate-500 font-normal">
          Rooms
          <span className="text-base font-semibold text-red-500">*</span>
        </Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.data.data.map((room) => (
          <div
            key={room.id}
            className={`flex flex-row items-center space-x-4 p-4 border rounded-lg cursor-pointer ${
              ids.includes(room.id) ? "bg-blue-50 border-blue-500" : ""
            }`}
            onClick={() => updateRooms(room.id)}
          >
            <BedSingle className="size-10 text-mainColor" />
            <p className="text-lg font-semibold">
              {room.roomNumber}
              <span className="text-sm font-normal text-neutral-500">
                ({room.capacity})
              </span>
            </p>
          </div>
        ))}
      </div>
      {getErrorMessage("rooms") && (
        <p className="text-red-500 text-sm">{getErrorMessage("rooms")}</p>
      )}
    </div>
  );
};
export default RoomSection;

export type DataType = {
  data: {
    data: Array<{
      id: number;
      roomNumber: number;
      capacity: number;
    }>;
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
  createdAt: string;
};
