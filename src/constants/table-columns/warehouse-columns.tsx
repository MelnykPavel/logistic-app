"use client";
import DropdownActions from "@/components/actions-dropdown-menu";
import { Button } from "@/components/ui/button";
import actionDeleteWarehouseById from "@/server/actions/warehouse/action-delete-warehouse";
import { WarehouseReadBody } from "@/types/warehouse";
import { date } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const warehouseColumns: ColumnDef<WarehouseReadBody>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "zipCode",
    header: "ZIP",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <>
          Creation Date
          <Button
            variant="ghost"
            className="ml-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className=" h-4 w-4" />
          </Button>
        </>
      );
    },
    cell: ({ row }) => {
      return date(row.getValue("createdAt"), true);
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <>
          Modified Date
          <Button
            variant="ghost"
            className="ml-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </>
      );
    },
    cell: ({ row }) => {
      return date(row.getValue("updatedAt"), true);
    },
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return (
        <DropdownActions
          id={row.original.id}
          entity="warehouse"
          deleteAction={actionDeleteWarehouseById}
        />
      );
    },
  },
];
