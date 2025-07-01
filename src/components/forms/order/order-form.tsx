"use client";

import { DatePickerForm } from "@/components/date-picker";
import OrderAdditionalDetails from "@/components/forms/order/order-additional-details";

import DriverActionButtons from "@/components/forms/order/order-action-buttons-driver";
import ManagerActionButtons from "@/components/forms/order/order-action-buttons-manager";
import { OrderCommentsModal } from "@/components/forms/order/order-comments-modal";
import OrderStatusControl from "@/components/forms/order/order-status-control";
import { SelectModal } from "@/components/select-modal";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthContext";
import { actionGetAllClients } from "@/server/actions/client/action-get-all-clients";
import { actionCreateOrder } from "@/server/actions/order/action-create-order";
import { actionUpdateOrder } from "@/server/actions/order/action-update-order";
import { actionGetAllWarehouses } from "@/server/actions/warehouse/action-get-all-warehouses";
import { ClientReadBody } from "@/types/client";
import { FormMode } from "@/types/form";
import { OrderReadBodyFull } from "@/types/order";
import { WarehouseReadBody } from "@/types/warehouse";
import { appRoutes } from "@/utils/appRoutes";
import { createFormVariants } from "@/utils/createFormVariants";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

type OrderFormProps = {
  type: FormMode;
  hasActiveOrder?: boolean;
  order?: OrderReadBodyFull;
};

const formVariants = createFormVariants({
  entityName: "Order",
  createAction: actionCreateOrder,
  updateAction: actionUpdateOrder,
  baseRoute: appRoutes.order.root,
});

export default function OrderForm({
  type = "create",
  hasActiveOrder,
  order,
}: OrderFormProps) {
  const { ...variants } = formVariants[type];
  const { isDriver, isManager } = useAuth();
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<WarehouseReadBody | null>(order?.warehouse ?? null);

  const [selectedClient, setSelectedClient] = useState<ClientReadBody | null>(
    order?.client ?? null,
  );

  const [state, formAction, pending] = useActionState(variants.action, {
    values: order ?? {},
  });

  const router = useRouter();

  if (!state || ((!order || !order.id) && type !== "create")) {
    router.push(appRoutes.dashboard);
    return null;
  }

  if (isDriver && type !== "view") {
    router.push(appRoutes.dashboard);
    return null;
  }

  return (
    <Form action={formAction}>
      {type === "edit" && <input type="hidden" name="id" value={order?.id} />}
      <div className="grid grid-cols-1  gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex w-full justify-end gap-6">
              <OrderStatusControl order={order} type={type} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-1/2 min-h-98 rounded-md border bg-gray-200 flex items-center justify-center text-sm text-muted-foreground">
                Map Placeholder
              </div>
            </div>
            <div className="grid my-8">
              {type !== "create" && (
                <OrderCommentsModal
                  trigger={<Button>Comments</Button>}
                  orderId={order?.id || ""}
                />
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-stretch justify-center sm:items-center sm:justify-around flex-col sm:flex-row gap-6 border rounded-md p-4">
                <input
                  type="hidden"
                  name="warehouseId"
                  value={selectedWarehouse?.id || ""}
                />
                {isManager && (
                  <SelectModal
                    trigger={<Button>Select Warehouse</Button>}
                    title="Select Warehouse"
                    fetchDataAction={actionGetAllWarehouses}
                    onSelectAction={(warehouse) =>
                      setSelectedWarehouse(warehouse)
                    }
                    primaryLabelKey="name"
                    secondaryLabelKey="address"
                  />
                )}

                <DatePickerForm
                  defaultValue={state?.values?.pickupDate}
                  name={"pickupDate"}
                  label={"Pickup Date"}
                  error={state.errors?.["pickupDate"]}
                />
              </div>
              <div className="flex items-stretch justify-center sm:items-center sm:justify-around flex-col sm:flex-row gap-6 border rounded-md p-4">
                <input
                  type="hidden"
                  name="clientId"
                  value={selectedClient?.id || ""}
                />
                {isManager && (
                  <SelectModal
                    trigger={<Button>Select Client</Button>}
                    title="Select Client"
                    fetchDataAction={actionGetAllClients}
                    onSelectAction={(client) => setSelectedClient(client)}
                    primaryLabelKey="firstName"
                    secondaryLabelKey="email"
                  />
                )}

                <DatePickerForm
                  defaultValue={state?.values?.deliveryDate}
                  name={"deliveryDate"}
                  label={"Delivery Date"}
                  error={state.errors?.["deliveryDate"]}
                />
              </div>
            </div>
          </div>
          <OrderAdditionalDetails
            client={selectedClient}
            warehouse={selectedWarehouse}
            driver={order?.driver}
            manager={order?.manager}
          />

          <div className="grid gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              maxLength={500}
              required={false}
              rows={4}
              placeholder="Add any additional details or instructions..."
              className="resize-none h-full min-h-40 max-h-54"
              readOnly={variants.readOnly}
              defaultValue={state?.values?.description || ""}
            />
            <FormField onlyError error={state.errors?.["description"]} />
          </div>
        </div>
        <FormField onlyError error={state.errors?.["form"]} />
      </div>

      {isManager && (
        <ManagerActionButtons {...variants} order={order} pending={pending} />
      )}
      {isDriver && (
        <DriverActionButtons order={order} hasActiveOrder={hasActiveOrder} />
      )}
    </Form>
  );
}
