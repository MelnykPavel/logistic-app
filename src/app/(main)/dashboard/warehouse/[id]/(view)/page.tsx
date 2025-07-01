"use server";

import CardWrapper from "@/components/card-wrapper";
import WarehouseForm from "@/components/forms/warehouse-form";
import getWarehouseByIdAction from "@/server/actions/warehouse/action-get-one-warehouse";
import { redirect } from "next/navigation";

export default async function ViewWarehousePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const warehouse = await getWarehouseByIdAction(id);
  if (!warehouse) redirect("/");

  return (
    <CardWrapper title="View Warehouse Information">
      <WarehouseForm type={"view"} warehouse={warehouse} />
    </CardWrapper>
  );
}
