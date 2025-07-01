import { OrderStatusEnum, OrderStatusType } from "@/types/order";

export const ORDER_STATUS_LABELS: Record<OrderStatusType, string> = {
  [OrderStatusEnum.NEW]: "New",
  [OrderStatusEnum.ASSIGNED]: "Assigned",
  [OrderStatusEnum.IN_PROGRESS]: "In Progress",
  [OrderStatusEnum.COMPLETED]: "Completed",
} as const;

export function orderStatusLabel(status: string): string {
  return Object.prototype.hasOwnProperty.call(ORDER_STATUS_LABELS, status)
    ? ORDER_STATUS_LABELS[status as OrderStatusType]
    : "";
}

export const ORDER_STATUSES = Object.values(OrderStatusEnum)
  .filter((status) => orderStatusLabel(status) !== "")
  .map((status) => ({
    value: status,
    label: orderStatusLabel(status),
  }));

const statusColorMap: Record<OrderStatusType, { text: string; bg: string }> = {
  [OrderStatusEnum.NEW]: { text: "text-blue-500", bg: "bg-blue-500" },
  [OrderStatusEnum.ASSIGNED]: { text: "text-yellow-500", bg: "bg-yellow-500" },
  [OrderStatusEnum.IN_PROGRESS]: {
    text: "text-orange-500",
    bg: "bg-orange-500",
  },
  [OrderStatusEnum.COMPLETED]: { text: "text-green-500", bg: "bg-green-500" },
};

export function getOrderStatusColor(status: OrderStatusType) {
  return statusColorMap[status] ?? { text: "text-gray-500", bg: "bg-gray-100" };
}
