import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchema } from "../schema";
import apiClient from "@/lib/api-client";

export function useAddRoom() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return apiClient.post(`/room/create`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
      toast({
        title: "room created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create room",
       // variant: "destructive",
      });
      console.error("error:", error);
    },
  });
}
