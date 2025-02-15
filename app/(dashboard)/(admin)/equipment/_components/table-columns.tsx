"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Item } from "../page";
import { formatDate } from "date-fns";
import ActionsButtons from "./actions-buttons";
import StatusButton from "./status-buttton";
import DescriptionTooltip from "@/components/shared/description-tooltip";

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
        className="ml-4"
      />
    ),
    cell: ({ row }) => (
      <div className="pl-4 h-full">
        <span
          className={cn(
            "flex origin-center w-[8px] transition-transform scale-y-0 h-full bg-crmMainColor rounded-r-full absolute left-0 top-0",
            { "scale-y-100": row.getIsSelected() }
          )}
        ></span>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Sélectionner la ligne"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="text-base">
        ID
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => <p className="text-sm">{row.original.id}</p>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-base">
        Equipement Name
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.name}</div>;
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <div className="text-base">
        Description
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <DescriptionTooltip
          title="Description"
          description={row.original.description}
        />
      );
    },
  },

  {
    accessorKey: "icon",
    header: ({ column }) => (
      <div className="text-base">
        Icon
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => (
      <img src={row.original.icon} loading="lazy" className="size-12" />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <div className="text-base">
        Active
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <StatusButton id={row.original.id} isActive={row.original.isActive} />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="text-base">
        Created At
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {formatDate(new Date(row.original.createdAt), "dd-MM-yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <ActionsButtons data={row.original} />;
    },
  },
];
