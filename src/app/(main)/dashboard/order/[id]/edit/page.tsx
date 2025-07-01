"use server";

import CardWrapper from "@/components/card-wrapper";
import OrderForm from "@/components/forms/order/order-form";
import { actionGetOrderByIdFull } from "@/server/actions/order/action-get-one-order";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await actionGetOrderByIdFull(id);
  if (!order) redirect(appRoutes.root);

  return (
    <CardWrapper title="Edit Order Details">
      <OrderForm type={"edit"} order={order} />
    </CardWrapper>
  );
}
