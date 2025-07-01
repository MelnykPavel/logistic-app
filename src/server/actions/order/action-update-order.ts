"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { formAction } from "@/lib/zod-helpers";
import {
  dbGetActiveOrderByDriverId,
  dbGetOrderById,
  dbUpdateOrderById,
} from "@/server/db/db-order";
import { cuidSchema } from "@/server/validation-schemas/common.schema";
import {
  switchOrderStatusSchema,
  updateOrderSchema,
} from "@/server/validation-schemas/order";
import { OrderStatusType } from "@/types/order";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const actionUpdateOrder = formAction(updateOrderSchema, async (data) => {
  const { allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) {
    return {
      errors: {
        form: ["You do not have permission to perform this action."],
      },
      values: { ...data },
    };
  }

  const { id, ...rest } = data;

  await dbUpdateOrderById(id, rest);

  revalidatePath(appRoutes.order.view(id));
  redirect(appRoutes.order.view(id));
});

export async function actionSwitchOrderStatus(
  orderId: string,
  status: OrderStatusType,
) {
  const { authUser } = await getUserAndCheckRole(RoleEnum.MANAGER);
  const { orderId: orderIdSafe, status: statusSafe } =
    switchOrderStatusSchema.parse({ orderId, status });

  const order = await dbGetOrderById(orderIdSafe);

  if (!order) {
    return;
  }

  if (authUser.role === "MANAGER") {
    await dbUpdateOrderById(order.id, { status: statusSafe });
    revalidatePath(appRoutes.order.edit(order.id));
    redirect(appRoutes.order.edit(order.id));
  }

  if (authUser.id !== order.driverId) {
    revalidatePath(appRoutes.dashboard);
    redirect(appRoutes.dashboard);
  }
  await dbUpdateOrderById(order.id, { status: statusSafe });

  revalidatePath(appRoutes.order.view(order.id));
  redirect(appRoutes.order.view(order.id));
}

export async function actionAcceptOrder(orderId: string) {
  const { authUser } = await getUserAndCheckRole(RoleEnum.DRIVER);
  const result = cuidSchema.safeParse(orderId);
  if (!result.success) return null;

  const isExist = await dbGetOrderById(orderId);

  if (!isExist) return null;
  if (isExist.status !== "NEW" && isExist.driverId !== null) return null;

  const activeOrder = await dbGetActiveOrderByDriverId(authUser.id);
  if (activeOrder) return null;

  await dbUpdateOrderById(orderId, {
    driverId: authUser.id,
    status: "ASSIGNED",
  });
  revalidatePath(appRoutes.order.activeOrder);
  redirect(appRoutes.order.activeOrder);
}

export async function actionDeclineOrder(orderId: string) {
  const { allowed } = await getUserAndCheckRole(RoleEnum.DRIVER);
  if (!allowed) return null;

  const result = cuidSchema.safeParse(orderId);
  if (!result.success) return null;

  const isExist = await dbGetOrderById(orderId);

  if (!isExist) return null;
  if (isExist.status === "NEW") return null;

  await dbUpdateOrderById(orderId, { driverId: null, status: "NEW" });

  revalidatePath(appRoutes.order.availableOrders);
  redirect(appRoutes.order.availableOrders);
}
