"use server";

import { getUserFromCookie } from "@/lib/auth/cookies";
import {
  dbGetActiveOrderByDriverId,
  dbGetOrderByIdFull,
} from "@/server/db/db-order";

export async function actionGetOrderByIdFull(orderId: string) {
  const authUser = await getUserFromCookie();
  if (authUser.role === "MANAGER") {
    return dbGetOrderByIdFull(orderId, authUser.id);
  }
  return dbGetOrderByIdFull(orderId);
}
export async function actionGetActiveOrder() {
  const authUser = await getUserFromCookie();

  return dbGetActiveOrderByDriverId(authUser.id);
}
