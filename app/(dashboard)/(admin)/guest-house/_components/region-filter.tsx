"use client";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { useUpdateSearchParams } from "@/hooks/use-set-search-param";
// import { useUpdateSearchParams } from "@/hooks/use-update-search-param"; // Adjust the import path

interface Option {
  value: string;
  label: string;
}

interface Props {
  title?: string;
  filterName: string;
  options: Array<Option>;
}

export function RegionFilter({ filterName, title, options }: Props) {
  const [selected, setSelected] = useQueryState(
    filterName,
    parseAsString.withDefault("")
  );

  const [page, setPage] = useQueryState("page", parseAsString);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(selected);

  const { deleteSearchParam } = useUpdateSearchParams();

  const handleSelect = (currentValue: string) => {
    if (currentValue === value) {
      setValue("");
      setSelected("");
      deleteSearchParam(filterName);
    } else {
      setValue(currentValue);
      setSelected(currentValue);
    }
    setPage("1");
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between !h-[38px]"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : "Select..."}
            <ChevronsUpDown className="ml-2 size-3 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search region..." />
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect} // Use the new handleSelect function
                  >
                    <Check
                      className={cn(
                        "mr-2 size-3",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value !== "Select..." && (
        <Button
          onClick={() => {
            setValue("");
            setSelected("");
            deleteSearchParam(filterName);
          }}
          variant="destructive"
          className="!size-8 rounded-full"
        >
          <X />
        </Button>
      )}
    </>
  );
}
