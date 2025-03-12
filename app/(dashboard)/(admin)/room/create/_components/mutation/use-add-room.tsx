import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { roomSchema } from "../schema";

export function useAddRoom() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof roomSchema>) => {
      return apiClient.post(`/room/create`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      toast({
        title: "room created successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create room",
        variant: "error",
      });
      console.error("error:", error);
    },
  });
}
