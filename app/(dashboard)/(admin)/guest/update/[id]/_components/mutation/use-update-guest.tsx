import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { formSchema } from "../../../../create/_components/schema";

export function useUpdateGuest(id: String) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return apiClient.put(`/client/update/${id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast({
        title: "Guest updated successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update guets",
        variant: "error",
      });
      console.error("error:", error);
    },
  });
}
