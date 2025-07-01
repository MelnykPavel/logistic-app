"use server";

import { getUserFromCookie } from "@/lib/auth/cookies";
import {
  dbGetActiveOrderByDriverId,
  dbGetOrderById,
  dbGetOrderByIdFull,
  dbGetOrderByIds,
} from "@/server/db/db-order";

export async function actionGetOrderById(orderId: string) {
  const authUser = await getUserFromCookie();
  if (authUser.role === "MANAGER") {
    return dbGetOrderByIds(orderId, authUser.id);
  }
  return dbGetOrderById(orderId);
}
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
