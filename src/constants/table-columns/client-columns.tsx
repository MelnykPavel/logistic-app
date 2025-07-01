"use client";
import DropdownActions from "@/components/actions-dropdown-menu";
import { Button } from "@/components/ui/button";
import actionDeleteClientById from "@/server/actions/client/action-delete-client";
import { ClientReadBody } from "@/types/client";
import { date } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const clientColumns: ColumnDef<ClientReadBody>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
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
            <ArrowUpDown className="h-4 w-4" />
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
          entity="client"
          deleteAction={actionDeleteClientById}
        />
      );
    },
  },
];
