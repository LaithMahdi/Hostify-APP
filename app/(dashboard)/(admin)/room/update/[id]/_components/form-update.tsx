"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Item } from "../../../page";
import { formSchema } from "../../../create/_components/schema";
import { useUpdateRoom } from "./mutation/use-update-room";

// const formSchema = z.object({
//   roomNumber: z.coerce.number().min(1, "Room number must be at least 1"),
//   type: z.string().min(1, "Type is required"),
//   pricePerNight: z.coerce.number().min(0, "Price must be at least 0"),
//   status: z.string().min(1, "Status is required"),
//   capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
//   hasBalcony: z.boolean(),
//   description: z.string().optional(),
//   guestHouseId: z.coerce.number().min(1, "Guest House ID is required"),
//   images: z.array(z.string()).optional(),
//   equipment: z.array(z.string()).optional(),
//   isActive: z.boolean(),
// });

interface Props {
  item: Item;
}

const FormUpdate = ({ item }: Props) => {
  // const [imageUrls, setImageUrls] = useState<string[]>(item.images || []);
  const { toast } = useToast();
  const updateRoom = useUpdateRoom({ id: item.id });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: item.roomNumber ?? 0,
      type: item.type ?? "",
      pricePerNight: item.pricePerNight ?? 0,
      status: item.status ?? "",
      capacity: item.capacity ?? 0,
      hasBalcony: item.hasBalcony ?? false,
      description: item.description ?? "",
      guestHouseId: item.guestHouseId,
      // images: item.images ?? [],
      equipment: item.equipment ?? [],
      isActive: item.isActive ?? false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateRoom.mutate(values, {
      onSuccess: () => {
        toast({ title: "Success", description: "Room updated successfully" });
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "An error occurred while updating the room",
          variant: "error",
        });
      },
    });
  }

  function handleReset() {
    form.reset();
    // setImageUrls(item.images || []);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerNight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Per Night</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasBalcony"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Has Balcony</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* <ImageUploader
          imageUrl={imageUrls}
          onChange={(url: string) => {
            const updatedUrls = [...imageUrls, url];
            setImageUrls(updatedUrls);
            form.setValue("images", updatedUrls);
          }}
        /> */}

        <div className="flex flex-row gap-2">
          <Button type="reset" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Update Room
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormUpdate;
