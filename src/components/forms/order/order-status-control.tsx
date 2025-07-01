"use client";

import OrderStatusBadge from "@/components/forms/order/order-status-badge";
import { OrderStatusDropdown } from "@/components/forms/order/order-status-dropdown";
import { useAuth } from "@/providers/AuthContext";
import { FormMode } from "@/types/form";
import {
  OrderReadBodyFull,
  OrderStatusEnum,
  OrderStatusType,
} from "@/types/order";

type OrderStatusControlProps = {
  order?: OrderReadBodyFull;
  type: FormMode;
};

const allowedStatuses: OrderStatusType[] = [
  OrderStatusEnum.NEW,
  OrderStatusEnum.ASSIGNED,
];

export default function OrderStatusControl({
  order,
  type,
}: OrderStatusControlProps) {
  const { isManager } = useAuth();
  if (!order || type === "create") return null;

  if (allowedStatuses.includes(order.status) || (isManager && type === "view"))
    return (
      <div className="flex items-center space-x-4">
        <span>Order status:</span>
        <OrderStatusBadge status={order.status} />
      </div>
    );

  return (
    <div className="flex items-center space-x-4">
      <span>Order status:</span>
      <OrderStatusBadge status={order.status} />

      <OrderStatusDropdown orderId={order.id} status={order.status} />
    </div>
  );
}
