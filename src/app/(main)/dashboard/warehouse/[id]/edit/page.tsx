"use server";

import CardWrapper from "@/components/card-wrapper";
import WarehouseForm from "@/components/forms/warehouse-form";
import actionGetWarehouseById from "@/server/actions/warehouse/action-get-one-warehouse";
import { redirect } from "next/navigation";

export default async function EditWarehousePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const warehouse = await actionGetWarehouseById(id);
  if (!warehouse) redirect("/");
  return (
    <CardWrapper title="Edit Warehouse Details">
      <WarehouseForm type={"edit"} warehouse={warehouse} />
    </CardWrapper>
  );
}
