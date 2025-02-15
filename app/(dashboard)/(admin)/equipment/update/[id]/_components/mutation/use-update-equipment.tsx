import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchema } from "../schema";
import apiClient from "@/lib/api-client";

export function useUpdateEquipment({ id }: { id: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return apiClient.put(`/equipment/update/${id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      toast({
        title: "Equipment updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to updated equipment",
        variant: "destructive",
      });
      console.error("error:", error);
    },
  });
}
