import { z } from "zod";
import { GuestHouse } from "./schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { governorates } from "../../_components/constants";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Props {
  formData: GuestHouse;
  updateForm: (path: string, value: any) => void;
  errors: z.ZodIssue[];
}

const InitialInformation = ({ formData, errors, updateForm }: Props) => {
  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path.includes(field));
    return error ? error.message : "";
  };
  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg w-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold">Initial Information</h1>
        <p className="text-gray-500 text-sm">
          This information will be used to create the guest house.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-500 font-normal">
          Name
          <span className="text-base font-semibold text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateForm("name", e.target.value)}
          placeholder="Enter the name of the guest house"
          className="rounded-lg py-5 shadow-none"
        />
        {getErrorMessage("name") && (
          <p className="text-red-500">{getErrorMessage("name")}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-2 flex-1">
          <Label htmlFor="region" className="text-slate-500 font-normal">
            Region
            <span className="text-base font-semibold text-red-500">*</span>
          </Label>
          <Select>
            <SelectTrigger className="rounded-lg py-5 shadow-none ">
              <SelectValue placeholder="Enter the region" />
            </SelectTrigger>
            <SelectContent>
              {governorates.map((e) => {
                return (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {getErrorMessage("region") && (
            <p className="text-red-500">{getErrorMessage("region")}</p>
          )}
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="address" className="text-slate-500 font-normal">
            Address
            <span className="text-base font-semibold text-red-500">*</span>
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateForm("address", e.target.value)}
            placeholder="Enter the address of the guest house"
            className="rounded-lg py-5 shadow-none"
          />
          {getErrorMessage("address") && (
            <p className="text-red-500">{getErrorMessage("address")}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-slate-500 font-normal">
          Description
          <span className="text-base font-semibold text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateForm("description", e.target.value)}
          placeholder="Enter the description of the guest house"
          className="rounded-lg py-5 shadow-none"
        />
        {getErrorMessage("description") && (
          <p className="text-red-500">{getErrorMessage("description")}</p>
        )}
      </div>
      <div className="flex justify-between items-center border py-2 px-4 rounded-lg">
        <div className="space-y-1">
          <Label htmlFor="hasParking" className="text-slate-900 font-normal">
            Has Parking
          </Label>
          <p className="text-xs text-slate-500">
            Does the guest house have parking? If yes, please check the box.
          </p>
        </div>
        <Switch
          checked={formData.hasParking}
          onCheckedChange={(value) => updateForm("hasParking", value)}
        />
      </div>

      <div className="flex justify-between items-center border py-2 px-4 rounded-lg">
        <div className="space-y-1">
          <Label htmlFor="isPetFriendly" className="text-slate-900 font-normal">
            Pet Friendly
          </Label>
          <p className="text-xs text-slate-500">
            Is the guest house pet friendly? If yes, please check the box.
          </p>
        </div>
        <Switch
          checked={formData.isPetFriendly}
          onCheckedChange={(value) => updateForm("isPetFriendly", value)}
        />
      </div>
    </div>
  );
};

export default InitialInformation;
