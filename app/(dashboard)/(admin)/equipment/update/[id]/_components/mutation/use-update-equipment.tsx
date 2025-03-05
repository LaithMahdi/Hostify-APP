import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { formSchema } from "../../../../create/_components/schema";

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
        variant: "success",
      });
      console.error("error:", error);
    },
  });
}
