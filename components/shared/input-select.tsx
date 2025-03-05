import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  selectValue: string;
  onSelectChange: (value: string) => void;
  options: Option[];
  inputValue: string;
  onInputChange: (value: string) => void;
  inputPlaceholder?: string;
}

export function InputSelect({
  selectValue,
  onSelectChange,
  options,
  inputValue,
  onInputChange,
  inputPlaceholder = "Select an option",
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === selectValue);

  return (
    <div className="flex rounded-lg shadow-sm shadow-black/5">
      <div className="relative">
        <div
          className="peer inline-flex h-full appearance-none items-center rounded-none rounded-s-lg border border-input bg-background pe-8 ps-3 text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center gap-2">
            <span className="line-clamp-1">{selectedOption?.label}</span>
          </div>
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            role="img"
            className="ml-2"
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute z-20 mt-1 min-w-full rounded-lg border border-input bg-background shadow-lg">
            {options.map((option) => {
              return (
                <div
                  key={option.value}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground text-sm line-clamp-1 cursor-pointer"
                  onClick={() => {
                    onSelectChange(option.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Input
        className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
        placeholder={inputPlaceholder}
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </div>
  );
}
