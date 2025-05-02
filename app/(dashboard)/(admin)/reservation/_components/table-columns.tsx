"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Item } from "../page";
import { formatDate } from "date-fns";
import ActionsButtons from "./actions-buttons";
import { DollarSign } from "lucide-react";
import StatusButton from "./status-button";

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
    accessorKey: "checkIn",
    header: ({ column }) => (
      <div className="text-base">
        Check In
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {formatDate(new Date(row.original.checkIn), "dd-MM-yyyy")}
        </p>
      );
    },
  },

  {
    accessorKey: "checkOut",
    header: ({ column }) => (
      <div className="text-base">
        Check Out
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {formatDate(new Date(row.original.checkOut), "dd-MM-yyyy")}
        </p>
      );
    },
  },
  {
    accessorKey: "guest",
    header: ({ column }) => (
      <div className="text-base">
        Guest Name
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <p className="text-sm">{row.original.client.fullName}</p>;
    },
  },
  {
    accessorKey: "room",

    header: ({ column }) => (
      <div className="text-base">
        Room Number
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <p className="text-sm">{row.original.room.roomNumber}</p>;
    },
  },
  {
    accessorKey: "totalPrice",

    header: ({ column }) => (
      <div className="text-base">
        Total Price
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 items-center">
          <p className="text-base font-semibold">{row.original.totalPrice}</p>
          <DollarSign className="size-4 text-green-700" />
        </div>
      );
    },
  },
  {
    accessorKey: "status",

    header: ({ column }) => (
      <div className="text-base">
        Status
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <StatusButton id={row.original.id} statusValue={row.original.status} />
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
