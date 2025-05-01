import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { reservationSchema } from "../schema";

export function useAddReservation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof reservationSchema>) => {
      return apiClient.post(`/reservation/create`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservation"],
      });
      toast({
        title: "Reservation created successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating reservation",
        variant: "error",
      });
      console.log("error:", error);
    },
  });
}
