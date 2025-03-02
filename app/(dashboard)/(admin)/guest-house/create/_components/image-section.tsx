import { z } from "zod";
import { GuestHouse } from "./schema";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/shared/image-uploader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash } from "lucide-react";

interface Props {
  formData: GuestHouse;
  updateForm: (path: string, value: any) => void;
  errors: z.ZodIssue[];
}

const ImageSection = ({ formData, errors, updateForm }: Props) => {
  const [images, setImages] = useState<string[]>(
    formData.images && formData.images.length > 0 ? formData.images : [""]
  );

  const getErrorMessage = (field: string) => {
    const error = errors.find((e) => e.path.includes(field));
    return error ? error.message : "";
  };

  const addImage = () => {
    const newImages = [...images, ""];
    setImages(newImages);
    updateForm(
      "images",
      newImages.filter((url) => url !== "")
    );
  };

  const updateImages = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);

    if (url !== "") {
      updateForm(
        "images",
        newImages.filter((url) => url !== "")
      );
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    updateForm(
      "images",
      newImages.filter((url) => url !== "")
    );
  };

  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-semibold">Add Images</h1>
          <p className="text-gray-500 text-sm">
            Add images of the guest house.
          </p>
        </div>
        <Button
          className="rounded-full !size-10"
          variant="primary"
          onClick={addImage}
          type="button"
        >
          <PlusCircleIcon className="w-6 h-6" />
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image" className="text-slate-500 font-normal">
          Images
          <span className="text-base font-semibold text-red-500">*</span>
        </Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <ImageUploader
              imageUrl={image}
              onChange={(url) => {
                updateImages(index, url);
              }}
              errorMessage={getErrorMessage("images")}
            />
            {index !== 0 && (
              <div className="absolute right-2 bottom-2">
                <Button
                  className="rounded-full !size-8 !p-0"
                  variant="destructive"
                  onClick={() => removeImage(index)}
                  type="button"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
