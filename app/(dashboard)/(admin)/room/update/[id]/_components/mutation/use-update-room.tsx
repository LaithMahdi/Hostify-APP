import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { formSchema } from "../schema";
import apiClient from "@/lib/api-client";
import { roomSchema } from "../schema";

export function useUpdateRoom({ id }: { id: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof roomSchema>) => {
      return apiClient.put(`/room/update/${id}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
      toast({
        title: "room updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to updated room",
        variant: "destructive",
      });
      console.error("error:", error);
    },
  });
}
