import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roomTypes, statusTypes } from "./type";

interface Room {
  roomNumber: number;
  type: string;
  pricePerNight: number;
  status: string;
  capacity: number;
  hasBalcony: boolean;
  description: string;
  isActive: boolean;
  images: string[];
}

interface Props {
  formData: Room;
  updateForm: (path: keyof Room, value: any) => void;
  errors: z.ZodIssue[];
}

const InitialInformation = ({ formData, errors, updateForm }: Props) => {
  const getErrorMessage = (field: keyof Room) => {
    const error = errors.find((e) => e.path.includes(field));
    return error ? error.message : "";
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg w-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold">Room Information</h1>
        <p className="text-gray-500 text-sm">Provide details about the room.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="roomNumber">
          Room Number<span className="text-red-500">*</span>
        </Label>
        <Input
          id="roomNumber"
          type="number"
          value={formData.roomNumber}
          onChange={(e) => updateForm("roomNumber", Number(e.target.value))}
          placeholder="Enter price per night"
          className="rounded-lg py-2 shadow-none"
        />
        {getErrorMessage("roomNumber") && (
          <p className="text-red-500">{getErrorMessage("roomNumber")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">
          Type<span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={(value) => updateForm("type", value)}>
          <SelectTrigger className="rounded-lg py-2 shadow-none">
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(roomTypes).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {getErrorMessage("type") && (
          <p className="text-red-500">{getErrorMessage("type")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricePerNight">Price per Night ($)</Label>
        <Input
          id="pricePerNight"
          type="number"
          value={formData.pricePerNight}
          onChange={(e) => updateForm("pricePerNight", Number(e.target.value))}
          placeholder="Enter price per night"
          className="rounded-lg py-2 shadow-none"
        />
        {getErrorMessage("pricePerNight") && (
          <p className="text-red-500">{getErrorMessage("pricePerNight")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">
          status<span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={(value) => updateForm("status", value)}>
          <SelectTrigger className="rounded-lg py-2 shadow-none">
            <SelectValue placeholder="Select room statut" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(statusTypes).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {getErrorMessage("status") && (
          <p className="text-red-500">{getErrorMessage("status")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          value={formData.capacity}
          onChange={(e) => updateForm("capacity", Number(e.target.value))}
          placeholder="Enter the room capacity"
          className="rounded-lg py-2 shadow-none"
        />
        {getErrorMessage("capacity") && (
          <p className="text-red-500">{getErrorMessage("capacity")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateForm("description", e.target.value)}
          placeholder="Enter a description of the room"
          className="rounded-lg py-2 shadow-none"
        />
        {getErrorMessage("description") && (
          <p className="text-red-500">{getErrorMessage("description")}</p>
        )}
      </div>

      <div className="flex justify-between items-center border py-2 px-4 rounded-lg">
        <div className="space-y-1">
          <Label htmlFor="hasBalcony" className="text-slate-900 font-normal">
            Has Balcony
          </Label>
          <p className="text-xs text-slate-500">
            Check this if the room has a balcony. This will be displayed on the
            room details page.
          </p>
        </div>
        <Switch
          checked={formData.hasBalcony}
          onCheckedChange={(value) => updateForm("hasBalcony", value)}
        />
      </div>

      <div className="flex justify-between items-center border py-2 px-4 rounded-lg">
        <div className="space-y-1">
          <Label htmlFor="isActive" className="text-slate-900 font-normal">
            Is Active
          </Label>
          <p className="text-xs text-slate-500">
            Check this if the room is active. This will be displayed on the room
            details page.
          </p>
        </div>
        <Switch
          checked={formData.isActive}
          onCheckedChange={(value) => updateForm("isActive", value)}
        />
      </div>
    </div>
  );
};

export default InitialInformation;
