"use client";

import { Button } from "@/components/ui/button";
import { FormMode, FormVariantConfig } from "@/types/form";
import { OrderReadBodyFull } from "@/types/order";
import { useRouter } from "next/navigation";

type ManagerActionButtonProps = Omit<FormVariantConfig<never>, "action"> & {
  type?: FormMode;
  pending: boolean;
  order?: OrderReadBodyFull;
};

export default function ManagerActionButtons({
  order,
  submitHandler,
  submitButtonType,
  pending,
  pendingText,
  nextButton,
}: ManagerActionButtonProps) {
  const router = useRouter();

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-around">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>

        <Button
          type={submitButtonType}
          disabled={pending}
          onClick={() => submitHandler?.(router, order?.id || "")}
        >
          {pending ? pendingText : nextButton}
        </Button>
      </div>
    </div>
  );
}
