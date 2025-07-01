"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { dbDeleteWarehouseById } from "@/server/db/db-warehouse";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function actionDeleteWarehouseById(warehouseId: string) {
  const { allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) {
    return {
      errors: {
        form: ["You do not have permission to perform this action."],
      },
    };
  }
  await dbDeleteWarehouseById(warehouseId);

  revalidatePath(appRoutes.warehouse.root);
  redirect(appRoutes.warehouse.root);
}
