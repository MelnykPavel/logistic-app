"use server";

import { getUserFromCookie } from "@/lib/auth/cookies";
import {
  dbGetWarehouseById,
  dbGetWarehouseByManagerId,
} from "@/server/db/db-warehouse";

export default async function actionGetWarehouseById(warehouseId: string) {
  const authUser = await getUserFromCookie();
  if (authUser.role === "MANAGER") {
    return dbGetWarehouseByManagerId(warehouseId, authUser.id);
  }
  return dbGetWarehouseById(warehouseId);
}
