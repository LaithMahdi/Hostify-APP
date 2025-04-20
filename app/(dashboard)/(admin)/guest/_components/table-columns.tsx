"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Item } from "../page";
import { formatDate } from "date-fns";
import ActionsButtons from "./actions-buttons";
import { Mars, Venus } from "lucide-react";

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
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-base">
        Full Name
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.fullName}</div>;
    },
  },

  {
    accessorKey: "cin",
    header: ({ column }) => (
      <div className="text-base">
        Cin
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.cin}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="text-base">
        E-mail
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <div className="text-base">
        Gender
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return row.original.gender === "MALE" ? (
        <Mars className="text-blue-600" />
      ) : (
        <Venus className="text-fuchsia-600" />
      );
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <div className="text-base">
        Age
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.age} Years</div>;
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
