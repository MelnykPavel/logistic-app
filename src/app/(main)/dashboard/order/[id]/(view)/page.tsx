"use server";

import CardWrapper from "@/components/card-wrapper";

import OrderForm from "@/components/forms/order/order-form";
import {
  actionGetActiveOrder,
  actionGetOrderByIdFull,
} from "@/server/actions/order/action-get-one-order";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export default async function ViewOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await actionGetOrderByIdFull(id);

  const hasActiveOrder = Boolean(await actionGetActiveOrder());
  if (!order) redirect(appRoutes.root);

  return (
    <CardWrapper title="View Order Information">
      <OrderForm type={"view"} order={order} hasActiveOrder={hasActiveOrder} />
    </CardWrapper>
  );
}
