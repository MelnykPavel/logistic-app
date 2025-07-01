"use client";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthContext";
import {
  actionAcceptOrder,
  actionDeclineOrder,
} from "@/server/actions/order/action-update-order";
import {
  OrderReadBodyFull,
  OrderStatusEnum,
  OrderStatusType,
} from "@/types/order";
import { appRoutes } from "@/utils/appRoutes";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type ConfirmActionType = "decline" | "assign";

export default function DriverActionButtons({
  order,
  hasActiveOrder,
}: {
  order?: OrderReadBodyFull;
  hasActiveOrder?: boolean;
}) {
  const { authUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [confirming, setConfirming] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmActionType | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const showAssigned =
    authUser.id !== order?.driverId &&
    order?.status === OrderStatusEnum.NEW &&
    !hasActiveOrder;

  const showDeclined =
    order?.status !== undefined &&
    (
      [OrderStatusEnum.NEW, OrderStatusEnum.COMPLETED] as OrderStatusType[]
    ).includes(order.status);

  const handleBack = () => {
    if (pathname.includes(appRoutes.order.activeOrder)) {
      router.push(appRoutes.dashboard);
      return;
    }
    router.back();
  };

  function onOpen(action: ConfirmActionType) {
    setConfirmAction(action);
    setConfirming(true);
  }

  function onCancel() {
    setConfirming(false);
    setConfirmAction(null);
  }

  function onConfirm() {
    if (!order) return;
    startTransition(async () => {
      if (confirmAction === "assign") {
        await actionAcceptOrder(order.id);
      }
      if (confirmAction === "decline") {
        await actionDeclineOrder(order.id);
      }
      onCancel();
    });
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-around">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>

        {!showDeclined && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => onOpen("decline")}
            disabled={isPending}
          >
            Decline
          </Button>
        )}

        {showAssigned && (
          <Button
            type="button"
            variant="default"
            onClick={() => onOpen("assign")}
            disabled={isPending}
          >
            Assign
          </Button>
        )}
      </div>

      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        description={`Are you sure you want to ${confirmAction} order?`}
        onCancel={onCancel}
        onConfirm={onConfirm}
        pending={isPending}
      />
    </div>
  );
}
