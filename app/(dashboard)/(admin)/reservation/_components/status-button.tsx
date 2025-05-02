import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  id: string;
  statusValue: string;
}

const options = [
  {
    id: "PENDING",
    label: "Pending",
    className: "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20",
  },
  {
    id: "CONFIRMED",
    label: "Confirmed",
    className: "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20",
  },
  {
    id: "CANCELLED",
    label: "Cancelled",
    className: "text-red-500 bg-red-500/10 hover:bg-red-500/20",
  },
  {
    id: "COMPLETED",
    label: "Completed",
    className: "text-blue-500 bg-blue-500/10 hover:bg-blue-500/20",
  },
];

export default function StatusButton({ statusValue, id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(statusValue);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ statusValue }: { statusValue: string }) => {
      return apiClient.patch(`/reservation/patch/${id}`, {
        status: statusValue,
      });
    },
    onSuccess: (data) => {
      if (data.data.success) {
        toast({
          title: "Reservation updated successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["reservations", id] });
        setOpen(false);
      } else {
        toast({
          title: "Failed to update reservation",
          variant: "success",
        });
        setOpen(false);
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to update reservation",
        variant: "error",
      });
      console.error("Failed", error);
    },
  });

  const handleFilterChange = (value: string) => {
    setSelectedValue(value);
    mutate({ statusValue: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "shadow-none py-2 px-4 w-fit rounded-md text-sm font-medium",
              options.find((option) => option.id === selectedValue)?.className
            )}
            disabled={isPending}
          >
            {selectedValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36 p-1">
          <div className="space-y-1">
            {options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "w-full h-10 flex items-center gap-2 px-3 rounded-md text-sm font-medium",
                  option.className
                )}
                disabled={isPending}
                onClick={() => handleFilterChange(option.id)}
              >
                {option.label}

                {selectedValue === option.id && (
                  <Check
                    className={
                      selectedValue === option.id ? option.className : "hidden"
                    }
                  />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
