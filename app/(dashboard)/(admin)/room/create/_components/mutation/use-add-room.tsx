import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { roomSchema } from "../schema";

export function useAddRoom() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof roomSchema>) => {
      try {
        const response = await apiClient.post(`/room/create`, values);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      toast({
        title: "Room created successfully",
        variant: "success",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create room",
        description: error.response?.data?.message || "An unexpected error occurred",
        variant: "error",
      });
      console.error("Error creating room:", error);
    },
  });
}
