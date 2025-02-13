import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Ban, Check, CheckCircle2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

interface Props {
  id: number;
  isActive: boolean;
}

const options = [
  {
    id: true,
    label: "Active",
    icon: <CheckCircle2 className="size-4 text-emerald-600" />,
  },
  {
    id: false,
    label: "Inactive",
    icon: <Ban className="size-4 text-red-600" />,
  },
];

export default function StatusButton({ isActive, id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<boolean>(isActive);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ isActive }: { isActive: boolean }) => {
      return apiClient.patch(`/equipment/patch/${id}`, { isActive: isActive });
    },
    onSuccess: (data) => {
      if (data.data.success) {
        toast.success("Equipment updated successfully");
        queryClient.invalidateQueries({ queryKey: ["equipments", id] });
        setOpen(false);
      } else {
        toast.error("Failed to update equipment");
        setOpen(false);
      }
    },
    onError: (error) => {
      toast.error("Failed to update equipment");
      console.error("Failed", error);
    },
  });

  const handleFilterChange = (value: boolean) => {
    setSelectedValue(value);
    mutate({ isActive: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "shadow-none",
              selectedValue
                ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                : "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
            )}
            disabled={isPending}
          >
            {selectedValue ? (
              <CheckCircle2 className="size-5 text-emerald-600" />
            ) : (
              <Ban className="size-5 text-red-600" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36 p-1">
          <div className="space-y-1">
            {options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "w-full h-10 flex items-center gap-2  px-3 rounded-md text-sm font-medium",
                  option.id
                    ? "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"
                    : "text-rose-500 bg-rose-500/10 hover:bg-rose-500/20"
                )}
                disabled={isPending}
                onClick={() => handleFilterChange(option.id)}
              >
                {option.icon}
                {option.label}

                {selectedValue === option.id && (
                  <Check
                    className={
                      option.id
                        ? "text-emerald-500 size-5"
                        : "text-rose-500 size-5"
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
