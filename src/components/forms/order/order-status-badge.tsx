import { Badge } from "@/components/ui/badge";
import { OrderStatusType } from "@/types/order";
import { cn } from "@/utils/cn";
import { getOrderStatusColor, orderStatusLabel } from "@/utils/orderStatus";

type OrderStatusDropdownProps = {
  status: OrderStatusType;
};

export default function OrderStatusBadge({ status }: OrderStatusDropdownProps) {
  return (
    <Badge className={cn(getOrderStatusColor(status).bg, "px-4 py-2")}>
      {orderStatusLabel(status)}
    </Badge>
  );
}
