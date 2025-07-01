"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { formAction } from "@/lib/zod-helpers";

import { dbGetClientById } from "@/server/db/db-client";
import { dbCreateOrder } from "@/server/db/db-order";
import { dbGetWarehouseById } from "@/server/db/db-warehouse";
import { createOrderSchema } from "@/server/validation-schemas/order";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const actionCreateOrder = formAction(createOrderSchema, async (data) => {
  const { allowed, authUser } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) {
    return {
      errors: {
        form: ["You do not have permission to perform this action."],
      },
      values: { ...data },
    };
  }
  const client = await dbGetClientById(data.clientId);
  if (!client) {
    return {
      errors: {
        form: ["Client does not exist"],
      },
      values: { ...data },
    };
  }
  const warehouse = await dbGetWarehouseById(data.warehouseId);

  if (!warehouse) {
    return {
      errors: {
        form: ["Warehouse does not exist"],
      },
      values: { ...data },
    };
  }
  await dbCreateOrder({ ...data, managerId: authUser.id });

  revalidatePath(appRoutes.order.myOrders);
  redirect(appRoutes.order.myOrders);
});
