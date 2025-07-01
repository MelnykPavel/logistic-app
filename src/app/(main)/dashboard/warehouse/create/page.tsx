"use server";

import CardWrapper from "@/components/card-wrapper";
import WarehouseForm from "@/components/forms/warehouse-form";

export default async function CreateWarehousePage() {
  return (
    <CardWrapper title="Create New Warehouse">
      <WarehouseForm type={"create"} />
    </CardWrapper>
  );
}
