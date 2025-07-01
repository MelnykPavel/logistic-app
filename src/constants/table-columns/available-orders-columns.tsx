"use client";
import DropdownActions from "@/components/actions-dropdown-menu";
import { Button } from "@/components/ui/button";

import { OrderReadBodyFull } from "@/types/order";
import { date } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const availableOrderColumns: ColumnDef<OrderReadBodyFull>[] = [
  {
    accessorKey: "client.firstName",
    header: "Full Name",
  },
  {
    accessorKey: "client.lastName",
    header: "Last Name",
  },
  {
    accessorKey: "client.address",
    header: "Address",
  },
  {
    accessorKey: "warehouse.name",
    header: "Warehouse Name",
  },
  {
    accessorKey: "warehouse.address",
    header: "Address",
  },
  {
    accessorKey: "driver.firstName",
    header: "Driver Name",
  },
  {
    accessorKey: "pickupDate",
    header: ({ column }) => {
      return (
        <>
          Pickup Date
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
      return date(row.getValue("pickupDate"), false);
    },
  },
  {
    accessorKey: "deliveryDate",
    header: ({ column }) => {
      return (
        <>
          Delivery Date
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
      return date(row.getValue("deliveryDate"), false);
    },
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
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return <DropdownActions id={row.original.id} entity="order" />;
    },
  },
];
