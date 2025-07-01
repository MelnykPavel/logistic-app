"use client";
import DropdownActions from "@/components/actions-dropdown-menu";
import OrderStatusBadge from "@/components/forms/order/order-status-badge";
import { Button } from "@/components/ui/button";
import actionDeleteOrderById from "@/server/actions/order/action-delete-order";

import { OrderReadBodyFull } from "@/types/order";
import { date } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const myOrderColumns: ColumnDef<OrderReadBodyFull>[] = [
  {
    accessorKey: "client.firstName",
    header: "First Name",
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <>
          Status
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
      return <OrderStatusBadge status={row.getValue("status")} />;
    },
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
      return (
        <DropdownActions
          id={row.original.id}
          entity="order"
          deleteAction={actionDeleteOrderById}
        />
      );
    },
  },
];
