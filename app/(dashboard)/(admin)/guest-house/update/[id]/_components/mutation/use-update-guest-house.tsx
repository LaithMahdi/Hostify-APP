import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { guestHouseSchema } from "../schema";

export function useUpdateGuestHouse({ id }: { id: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof guestHouseSchema>) => {
      return apiClient.put(`/guest-house/update/${id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guest-houses"],
      });

      toast({
        title: "Guest house updated successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating guest house",
        variant: "error",
      });
      console.error("error:", error);
    },
  });
}
