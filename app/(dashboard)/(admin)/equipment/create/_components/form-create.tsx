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
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "./schema";
import { useAddEquipment } from "./mutation/use-add-equipment";
import ImageUploader from "@/components/shared/image-uploader";

const FormCreate = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();
  const addEquipment = useAddEquipment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      isActive: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      addEquipment.mutate(values);
      toast({
        title: "Succés",
        description: "Equipment created successfully",
      });
      handleReset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    }
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
        <ImageUploader
          imageUrl={imageUrl}
          onChange={(url) => {
            setImageUrl(url);
            form.setValue("icon", url);
          }}
          errorMessage={form.formState.errors.icon?.message}
        />

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

export default FormCreate;
