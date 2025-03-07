import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { parseAsString, useQueryState } from "nuqs";
import { Separator } from "../ui/separator";

interface Option {
  id: string;
  label: string;
}

interface Props {
  title?: string;
  filterName: string;
  options: Array<Option>;
}

export default function FilterButton({ title, options, filterName }: Props) {
  const [selected, setSelected] = useQueryState(
    filterName,
    parseAsString.withDefault("")
  );

  const [page, setPage] = useQueryState("page", parseAsString);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterChange = (filter: Option) => {
    setSelectedFilter(filter.id);
    setPage("1");
    setSelected(filter.id);
  };

  const handleClearFilter = () => {
    setSelectedFilter(null);
    setPage("1");
    setSelected("");
  };

  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-label="Filters" className="h-10">
            <ListFilter className="size-12" aria-hidden="true" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36 p-3">
          <div className="space-y-3">
            <div className="text-xs font-medium text-muted-foreground">
              {title || "Filter by"}
            </div>
            <form className="space-y-3">
              {options.map((filter) => (
                <div key={filter.id} className="flex items-center gap-2">
                  <Checkbox
                    id={filter.id}
                    name={`name-${filter.id}-checkbox`}
                    checked={selectedFilter === filter.id}
                    onCheckedChange={() => handleFilterChange(filter)}
                  />
                  <Label
                    htmlFor={filter.id}
                    className={`cursor-pointer text-sm font-normal flex items-center gap-2 ${
                      selectedFilter === filter.id
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                  >
                    {filter.label}
                  </Label>
                </div>
              ))}
              <Separator />

              <Button
                size="sm"
                variant="outline"
                className="!h-7 !px-2 text-xs w-full"
                onClick={handleClearFilter}
                type="button"
              >
                Clear
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
