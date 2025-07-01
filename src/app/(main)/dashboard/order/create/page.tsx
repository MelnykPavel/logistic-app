"use server";

import CardWrapper from "@/components/card-wrapper";
import OrderForm from "@/components/forms/order/order-form";

export default async function CreateOrderPage() {
  return (
    <CardWrapper title="Create New Order">
      <OrderForm type={"create"} />
    </CardWrapper>
  );
}
