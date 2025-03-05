import { useCallback, useState } from "react";
import { Item } from "../page";
import { DataTable } from "@/components/ui/data-table";
import { useUpdateSearchParams } from "@/hooks/use-set-search-param";
import { columns } from "./table-colouns";



type Props = {
  viewMode: string;
   items: Item[] | undefined;
  isLoading: boolean;
  paginationProps?: {
    advanced?: {
      itemsPerPage: number;
      totalItems: number;
      onPageChange: (page: number) => void;
      pageIndex: number;
    };
    isNextDisabled: boolean;
    isPreviousDisabled: boolean;
    onNextClick: () => void;
    onPreviousClick: () => void;
  };
};




export default function Items({
  items = [],
  paginationProps,
  isLoading,
  viewMode,
}: Props) {
  const { setMultipleSearchParams, deleteSearchParam } =
    useUpdateSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onSelectedRowsChange = useCallback((rows: Item[]) => {
    setSelectedIds(rows.map((item) => item.id.toString()));
  }, []);

  const onSelectedCardsChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  return (
    <div className="mt-3 w-full">
      {viewMode === "grid" ? (
        <div>Grid View Placeholder</div> 
      ) : (
        <DataTable
          onSelectedRowsChange={onSelectedRowsChange}
          paginationProps={paginationProps}
          columns={columns ?? []}
          data={items}
          isLoading={isLoading}
          moduleColor="hover:bg-mainColor/5"
          ModulePaginationColor="bg-mainColor"
        />
      )}
    </div>
  );
}
