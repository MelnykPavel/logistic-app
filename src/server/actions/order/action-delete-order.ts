"use server";
import {  getUserAndCheckRole } from "@/lib/auth/cookies";
import { dbDeleteOrderById } from "@/server/db/db-order";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function actionDeleteOrderById(orderId: string) {
  const { allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) {
    return {
      errors: {
        form: ["You do not have permission to perform this action."],
      },
    };
  }

  await dbDeleteOrderById(orderId);
  revalidatePath(appRoutes.order.myOrders);
  redirect(appRoutes.order.myOrders);
}
