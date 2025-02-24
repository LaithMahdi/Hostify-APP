import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function DescriptionTooltip({ title, description }: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="!p-3">
            <InfoIcon className="size-4 text-mainColor" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="py-3 bg-white border w-[300px]">
          <div className="space-y-1">
            <p className="text-[13px] font-medium text-black">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
