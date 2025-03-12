"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import StatusButton from "./status-button";
import DescriptionTooltip from "@/components/shared/description-tooltip";
import ActionsButtons from "./action-buttons";

export type Room = {
  id: number;
  roomNumber: number;
  type: string;
  pricePerNight: number;
  status: string;
  capacity: number;
  hasBalcony: boolean;
  description?: string;
  guestHouseId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Room>[] = [
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
      <div className="pl-4 h-full relative">
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
    accessorKey: "roomNumber",
    header: "Numéro de chambre",
    cell: ({ row }) => <p className="text-sm">{row.original.roomNumber}</p>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <p className="text-sm">{row.original.type}</p>,
  },
  {
    accessorKey: "pricePerNight",
    header: "Prix par nuit",
    cell: ({ row }) => <p className="text-sm">{row.original.pricePerNight} €</p>,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => <p className="text-sm">{row.original.status}</p>,
  },
  {
    accessorKey: "capacity",
    header: "Capacité",
    cell: ({ row }) => <p className="text-sm">{row.original.capacity} personnes</p>,
  },
  {
    accessorKey: "hasBalcony",
    header: "Balcon",
    cell: ({ row }) => (
      <p className="text-sm">{row.original.hasBalcony ? "Oui" : "Non"}</p>
    ),
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
    cell: ({ row }) => (
      <DescriptionTooltip
        title="Description"
        description={row.original.description || "Pas de description"}
      />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <div className="text-base">
        Actif
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => (
      <StatusButton id={row.original.id} isActive={row.original.isActive} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="text-base">
        Créé le
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {format(new Date(row.original.createdAt), "dd-MM-yyyy HH:mm")}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <div className="text-base">
        Mis à jour le
        <button
          className="ml-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {format(new Date(row.original.updatedAt), "dd-MM-yyyy HH:mm")}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <ActionsButtons data={row.original} />;
    },
  },
];
