"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionSwitchOrderStatus } from "@/server/actions/order/action-update-order";
import { OrderStatusEnum, OrderStatusType } from "@/types/order";
import { cn } from "@/utils/cn";
import { getOrderStatusColor, ORDER_STATUSES } from "@/utils/orderStatus";
import { useState } from "react";

type OrderStatusDropdownProps = {
  orderId: string;
  status: OrderStatusType;
};

const excludedStatuses: OrderStatusType[] = [
  OrderStatusEnum.NEW,
  OrderStatusEnum.ASSIGNED,
];

const availableStatuses = ORDER_STATUSES.filter(
  ({ value }) => !excludedStatuses.includes(value),
);

export function OrderStatusDropdown({
  orderId,
  status,
}: OrderStatusDropdownProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatusType>(status);
  if (!orderId) return null;
  const handleConfirm = async (value: string) => {
    const newStatus = value as OrderStatusType;
    setOrderStatus(newStatus);
    await actionSwitchOrderStatus(orderId, newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Change order status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={orderStatus}
          onValueChange={handleConfirm}
        >
          {availableStatuses.map(({ value, label }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className={cn(getOrderStatusColor(value).text)}
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
