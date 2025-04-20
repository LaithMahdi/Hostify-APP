import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchema } from "../schema";
import apiClient from "@/lib/api-client";

export function useAddGuest() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return apiClient.post(`/client/create`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast({
        title: "Guest created successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create guets",
        variant: "error",
      });
      console.error("error:", error);
    },
  });
}
