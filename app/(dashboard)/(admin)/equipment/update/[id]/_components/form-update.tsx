"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "./schema";
import { useUpdateEquipment } from "./mutation/use-update-equipment";
import { Item } from "../../../page";

interface Props {
  item: Item;
}

const FormUpdate = ({ item }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(item.icon ? item.icon : "");
  const { toast } = useToast();
  const updateEquipment = useUpdateEquipment({ id: item.id });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name ?? "",
      description: item.description ?? "",
      icon: item.icon ?? "",
      isActive: item?.isActive ?? true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try {
      updateEquipment.mutate(values);
      toast({
        title: "Success",
        description: "Equipment updated successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    }
  }

  function handleUploadComplete(res: string) {
    setImageUrl(res);
    form.setValue("icon", res);
  }

  function handleReset() {
    form.reset();
    setImageUrl("");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g WIFI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-gray-500">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g wifi...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>
                    Active <span className="text-gray-500">(optional)</span>
                  </FormLabel>
                  <FormDescription>
                    If the equipment is active or not. Default is active.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-mainColor"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          {imageUrl == "" ? (
            <div>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  handleUploadComplete(res[0].ufsUrl);
                  form.clearErrors("icon");
                }}
                config={{
                  mode: "auto",
                }}
                onUploadError={(error: Error) => {
                  console.log(`ERROR! ${error.message}`);
                }}
              />
              <p className="text-red-500 text-sm mt-2">
                {form.formState.errors.icon?.message}
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imageUrl}
                loading="lazy"
                alt="icon"
                className="w-full h-[18rem] rounded-lg object-cover"
              />
              <div className="absolute -top-4 -right-4">
                <Button
                  size="icon"
                  variant="destructive"
                  className="rounded-full"
                  onClick={() => {
                    setImageUrl("");
                    form.setValue("icon", "");
                  }}
                >
                  <X />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-2">
          <Button type="reset" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormUpdate;
