import { Input } from "@/components/ui/input";
import { useUpdateSearchParams } from "@/hooks/use-set-search-param";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  placeholder?: string;
}

export default function Search({ placeholder }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const { setMultipleSearchParams, deleteSearchParam } =
    useUpdateSearchParams();
  const [debouncedValue, setDebouncedValue] = useState("");

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Update search params when the debounced value changes
  useEffect(() => {
    if (debouncedValue) {
      setMultipleSearchParams([
        {
          name: "roomNumber",
          value: debouncedValue,
        },
        {
          name: "page",
          value: "1",
        },
      ]);
    } else {
      deleteSearchParam("search");
    }
  }, [debouncedValue, setMultipleSearchParams, deleteSearchParam]);

  return (
    <form className="relative" onSubmit={(e) => e.preventDefault()}>
      <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 size-5 scale-95 text-mainColor" />
      <Input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        placeholder={placeholder ?? "Rechercher..."}
        className="pl-12 text-sm h-10 pr-12 placeholder:!font-medium border-opacity-50 rounded-lg border"
      />
    </form>
  );
}
