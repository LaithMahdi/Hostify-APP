import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Item } from "../page";
import apiClient from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Props {
  data: Item;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const DeleteButton = ({ data, open, onOpenChange }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return apiClient.delete(`/client/delete/${data.id}`);
    },
    onSuccess: (data) => {
      if (data.data.success) {
        toast({
          title: "Guest deleted successfully",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["guests"] });
        onOpenChange(false);
      } else {
        toast({
          title: "Failed to delete guest",
          variant: "error",
        });
        onOpenChange(false);
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to delete guest",
        variant: "error",
      });
      console.error("Failed", error);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete &nbsp;
            {data.fullName} &nbsp;from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="py-2 px-4">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-600/90 py-2 px-4"
            disabled={isPending}
            onClick={() => mutate()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
