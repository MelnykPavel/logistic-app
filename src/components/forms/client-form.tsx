"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { actionCreateClient } from "@/server/actions/client/action-create-client";
import { actionUpdateClient } from "@/server/actions/client/action-update-client";
import { ClientReadBody } from "@/types/client";
import { FormMode } from "@/types/form";
import { appRoutes } from "@/utils/appRoutes";
import { createFormVariants } from "@/utils/createFormVariants";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

type ClientFormProps = {
  type: FormMode;
  client?: ClientReadBody;
};

const formVariants = createFormVariants({
  entityName: "Client",
  createAction: actionCreateClient,
  updateAction: actionUpdateClient,
  baseRoute: appRoutes.client.root,
});

export default function ClientForm({
  type = "create",
  client,
}: ClientFormProps) {
  const { ...variants } = formVariants[type];
  const [state, formAction, pending] = useActionState(variants.action, {
    values: client ?? {},
  });
  const router = useRouter();

  if (!state) {
    router.push("/");
  }
  return (
    <Form action={formAction}>
      {type === "edit" && (
        <input type="hidden" name="id" value={client?.id || ""} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              name="firstName"
              defaultValue={state?.values?.firstName}
              readOnly={variants.readOnly}
              error={state.errors?.["firstName"]}
            />
            <FormField
              label="Last Name"
              name="lastName"
              defaultValue={state?.values?.lastName}
              readOnly={variants.readOnly}
              error={state.errors?.["lastName"]}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Phone"
              name="phone"
              type="tel"
              defaultValue={state?.values?.phone}
              readOnly={variants.readOnly}
              error={state.errors?.["phone"]}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              defaultValue={state?.values?.email}
              readOnly={variants.readOnly}
              error={state.errors?.["email"]}
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

          <div className="flex flex-col gap-2 h-1/2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              maxLength={500}
              rows={4}
              placeholder="Additional notes about the client..."
              className="resize-none h-full max-h-54"
              readOnly={variants.readOnly}
              defaultValue={state?.values?.comment || ""}
            />
            <FormField onlyError error={state.errors?.["comment"]} />
          </div>
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
          onClick={() => variants.submitHandler(router, client?.id || "")}
        >
          {pending ? variants.pendingText : variants.nextButton}
        </Button>
      </div>
    </Form>
  );
}
