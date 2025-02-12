"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";
import AdvancedPagination from "./advanced-pagination";
import NextAndPreviousButtons from "./next-previous-buttons";
import { DataTableViewOptions } from "./data-table-view-options";

export type DataTableProps<TData> = {
  onSelectedRowsChange?: (rows: TData[]) => void;
  data: TData[];
  columns: ColumnDef<TData>[];
  moduleColor?: string;
  ModulePaginationColor?: string;
  isLoading?: boolean;
  children?: ReactNode;
  showColumnsFilter?: boolean;
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
  getSubRows?: (row: TData) => TData[];
  initialColumnVisibility?: VisibilityState;
};

export function DataTable<TData>({
  showColumnsFilter = false,
  data,
  moduleColor,
  ModulePaginationColor,
  columns,
  paginationProps,
  isLoading = false,
  onSelectedRowsChange,
  children,
  getSubRows,
  initialColumnVisibility,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility ?? {}
  );
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getSubRows,
    onExpandedChange: setExpanded,
    enableRowSelection: true,
    getRowId: (row: any) => row?.id?.toString(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
    },
  });

  useEffect(() => {
    const selectedItems = Object.entries(rowSelection)
      .filter(([_, selected]) => selected)
      .map(([id]) => {
        const row = data.find((item: any) => item?.id?.toString() === id);
        return row as TData;
      })
      .filter(Boolean);

    onSelectedRowsChange?.(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  // Loading skeleton component
  const LoadingSkeleton = () => {
    const skeletonRows = Array(5).fill(null);
    return (
      <>
        {skeletonRows.map((_, index) => (
          <TableRow key={index} className={`animate-pulse ${moduleColor}`}>
            {columns.map((column, cellIndex) => (
              <TableCell key={cellIndex} className="p-4">
                <div className="flex items-center space-x-2">
                  {column.id === "select" && (
                    <div className="h-5 w-5 rounded bg-neutral-300" />
                  )}
                  <div
                    className={cn(
                      "h-8 bg-neutral-300 mx-auto rounded",
                      column.id === "select"
                        ? "w-0"
                        : column.id === "actions"
                        ? "w-24"
                        : cellIndex % 3 === 0
                        ? "w-24"
                        : cellIndex % 3 === 1
                        ? "w-32"
                        : "w-28"
                    )}
                  />
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <div className="">
      <div className={" flex items-center gap-2 mb-2 justify-end "}>
        {children}
        {showColumnsFilter && (
          <DataTableViewOptions table={table} moduleColor={moduleColor} />
        )}
      </div>
      <div className="rounded-md bg-white overflow-y-hidden border-b shadow-lg border">
        <Table>
          <TableHeader className="relative">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(`transition-colors ${moduleColor}`, {
                  "opacity-50": isLoading,
                })}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-5 text-gray-800 text-base font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(`transition-colors relative ${moduleColor}`, {
                    "!shadow-[0px_5px_5px] !shadow-stone-200":
                      row.getIsSelected(),
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-base w-fit">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={`hover:bg-posMainColor/10  ${moduleColor}`}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="h-16 border-t flex">
          <div className="flex items-center justify-between w-full px-5">
            {/* if advanced is not defined the pagination will use next and previous buttons  */}
            {!paginationProps?.advanced && paginationProps && (
              <NextAndPreviousButtons
                className="ml-auto"
                {...paginationProps}
              />
            )}

            {paginationProps?.advanced !== undefined && (
              <AdvancedPagination
                ModulePaginationColor={ModulePaginationColor}
                itemsPerPage={paginationProps.advanced.itemsPerPage}
                totalItems={paginationProps.advanced.totalItems}
                pageIndex={paginationProps.advanced.pageIndex}
                pageCount={Math.ceil(
                  paginationProps.advanced.totalItems /
                    paginationProps.advanced.itemsPerPage
                )}
                onPageChange={paginationProps.advanced.onPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
