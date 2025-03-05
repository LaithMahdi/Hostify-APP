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

import ImageUploader from "@/components/shared/image-uploader";
import { useRouter } from "next/navigation";
import { useAddRoom } from "./multation/use-add-room";


const FormCreate = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const addRoom = useAddRoom();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: 0,
      type: "",
      pricePerNight: 0,
      status: "",
      capacity: 1,
      hasBalcony: false,
      description: "",
      guestHouseId: 0,
      images: [],
      equipment: [],
      isActive: true,
   
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await addRoom.mutateAsync(values);
      toast({
        title: "Succès",
        description: "Chambre créée avec succès",
      });
      handleReset();
      router.push("/create");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    form.reset();
    setImageUrl("");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-3">
          {/* Room Number */}
          <FormField control={form.control} name="roomNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de chambre</FormLabel>
              <FormControl>
                <Input type="number" placeholder="101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Type */}
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Type de chambre</FormLabel>
              <FormControl>
                <Input placeholder="Simple, Double..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Price per night */}
          <FormField control={form.control} name="pricePerNight" render={({ field }) => (
            <FormItem>
              <FormLabel>Prix par nuit</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Status */}
          <FormField control={form.control} name="status" render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <FormControl>
                <Input placeholder="Disponible, Occupée..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Capacity */}
          <FormField control={form.control} name="capacity" render={({ field }) => (
            <FormItem>
              <FormLabel>Capacité</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Balcony */}
          <FormField control={form.control} name="hasBalcony" render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Balcon</FormLabel>
                <FormDescription>La chambre dispose-t-elle d'un balcon ?</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )} />

          {/* Description */}
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Ajoutez une description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Guest House ID */}
          <FormField control={form.control} name="guestHouseId" render={({ field }) => (
            <FormItem>
              <FormLabel>Maison d'hôtes</FormLabel>
              <FormControl>
                <Input type="number" placeholder="ID de la maison d'hôtes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Active status */}
          <FormField control={form.control} name="isActive" render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
                <FormDescription>La chambre est-elle active ?</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )} />

          {/* Equipment */}
          <FormField control={form.control} name="equipment" render={({ field }) => (
            <FormItem>
              <FormLabel>Équipements</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Liste des équipements séparés par des virgules"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Image Uploader */}
        <ImageUploader
          imageUrl={imageUrl}
          onChange={(url) => {
            setImageUrl(url);
            form.setValue("images", [url]);
          }}
          errorMessage={form.formState.errors.images?.message}
        />

        {/* Submit and Reset buttons */}
        <div className="flex flex-row gap-2">
          <Button type="reset" variant="outline" onClick={handleReset} disabled={loading}>
            Réinitialiser
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "En cours..." : "Soumettre"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormCreate;
