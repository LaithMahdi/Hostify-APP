import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface AdvancedPaginationProps {
  pageIndex: number;
  pageCount: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
  ModulePaginationColor?: string;
}

const AdvancedPagination: React.FC<AdvancedPaginationProps> = ({
  pageIndex,
  pageCount,
  totalItems,
  itemsPerPage,
  ModulePaginationColor,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  className = "",
}) => {
  const getPageRange = () => {
    if (pageCount <= 1) return [1];

    const delta = 1;
    const range: (number | string)[] = [];
    const left = Math.max(1, pageIndex - delta);
    const right = Math.min(pageCount, pageIndex + delta);

    if (left > 1) range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < pageCount - 1) range.push("...");
    if (right < pageCount) range.push(pageCount);

    return range;
  };

  const startItem = (pageIndex - 1) * itemsPerPage + 1;
  const endItem = Math.min(pageIndex * itemsPerPage, totalItems);

  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-center w-full md:justify-between ${className}`}
    >
      <div className="flex items-center gap-2 text-sm">
        <span>
          Affichage {startItem} à {endItem} sur {totalItems} résultats
        </span>
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <select
              className="rounded border border-gray-300 bg-white px-2 py-1"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>par page</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1">
        <Button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex <= 1}
          variant={"outline"}
          className="flex !h-10 !w-10  rounded-md items-center justify-center border border-gray-300 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageRange().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <Button
                onClick={() => onPageChange(page as number)}
                variant={pageIndex === (page as number) ? "default" : "outline"}
                className={cn(
                  "!h-10 !w-10  rounded-md",
                  pageIndex === (page as number)
                    ? `bg-posMainColor ${ModulePaginationColor} text-white`
                    : "border border-gray-300  hover:bg-gray-100"
                )}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex >= pageCount}
          variant={"outline"}
          className="flex  items-center justify-center  border border-gray-300 !h-10 !w-10  rounded-md disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdvancedPagination;
