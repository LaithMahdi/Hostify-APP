import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchema } from "../schema";
import apiClient from "@/lib/api-client";

export function useAddEquipment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return apiClient.post(`/equipment/create`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      toast({
        title: "Equipment created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create equipment",
        variant: "error",
      });
      console.error("error:", error);
    },
  });
}
