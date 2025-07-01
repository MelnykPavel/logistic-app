"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { actionCreateWarehouse } from "@/server/actions/warehouse/action-create-warehouse";
import { actionUpdateWarehouse } from "@/server/actions/warehouse/action-update-warehouse";
import { FormMode } from "@/types/form";
import { WarehouseReadBody } from "@/types/warehouse";
import { appRoutes } from "@/utils/appRoutes";
import { createFormVariants } from "@/utils/createFormVariants";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

type WarehouseFormProps = {
  type: FormMode;
  warehouse?: WarehouseReadBody;
};

const formVariants = createFormVariants({
  entityName: "Warehouse",
  createAction: actionCreateWarehouse,
  updateAction: actionUpdateWarehouse,
  baseRoute: appRoutes.warehouse.root,
});

export default function WarehouseForm({
  type = "create",
  warehouse,
}: WarehouseFormProps) {
  const { ...variants } = formVariants[type];
  const [state, formAction, pending] = useActionState(variants.action, {
    values: warehouse ?? {},
  });
  const router = useRouter();

  if (!state) {
    router.push(appRoutes.dashboard);
  }
  return (
    <Form action={formAction}>
      {type === "edit" && (
        <input type="hidden" name="id" value={warehouse?.id || ""} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Name"
              name="name"
              defaultValue={state?.values?.name}
              readOnly={variants.readOnly}
              error={state.errors?.["name"]}
            />
          </div>
          <h3 className="text-sm font-semibold text-muted-foreground">
            Address Info
          </h3>
          <FormField
            label="Address"
            name="address"
            defaultValue={state?.values?.address}
            readOnly={variants.readOnly}
            error={state.errors?.["address"]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="City"
              name="city"
              defaultValue={state?.values?.city}
              readOnly={variants.readOnly}
              error={state.errors?.["city"]}
            />
            <FormField
              label="State"
              name="state"
              defaultValue={state?.values?.state || ""}
              required={false}
              readOnly={variants.readOnly}
              error={state.errors?.["state"]}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Zip Code"
              name="zipCode"
              defaultValue={state?.values?.zipCode}
              readOnly={variants.readOnly}
              error={state.errors?.["zipCode"]}
            />
            <FormField
              label="Country"
              name="country"
              defaultValue={state?.values?.country}
              readOnly={variants.readOnly}
              error={state.errors?.["country"]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {type !== "create" && (
            <div className="h-1/2 rounded-md border bg-gray-200 flex items-center justify-center text-sm text-muted-foreground">
              Map Placeholder
            </div>
          )}
        </div>
        <FormField onlyError error={state.errors?.["form"]} />
      </div>
      <div className="lg:max-w-1/2 self-center mx-auto flex justify-around mt-6">
        <Button type="button" variant="outline" onClick={router.back}>
          Back
        </Button>
        <Button
          type={variants.submitButtonType}
          disabled={pending}
          onClick={() => variants.submitHandler(router, warehouse?.id || "")}
        >
          {pending ? variants.pendingText : variants.nextButton}
        </Button>
      </div>
    </Form>
  );
}
