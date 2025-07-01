"use server";

import CardWrapper from "@/components/card-wrapper";
import OrderForm from "@/components/forms/order/order-form";
import { actionGetActiveOrder } from "@/server/actions/order/action-get-one-order";

export default async function ActiveOrderPage() {
  const order = await actionGetActiveOrder();

  if (!order) {
    return (
      <CardWrapper title="No Active Order">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <span className="text-lg text-muted-foreground">
            You have no active order
          </span>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper title="Active Order">
      <OrderForm type="view" order={order} />
    </CardWrapper>
  );
}
