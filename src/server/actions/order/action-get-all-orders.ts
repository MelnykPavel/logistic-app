"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import {
  dbGetAllAvailableOrders,
  dbGetAllHistoryOrders,
  dbGetOrdersByManagerId,
  dbGetOrdersByManagerIdFull,
} from "@/server/db/db-order";
import { PaginationSchema } from "@/server/validation-schemas/common.schema";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export async function actionGetAllOrders(
  page: number,
  size?: number,
  query?: string,
) {
  const { authUser, allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) return redirect(appRoutes.dashboard);

  const {
    page: safePage,
    size: safeSize,
    query: safeQuery,
  } = PaginationSchema.parse({
    page,
    size,
    query,
  });
  return dbGetOrdersByManagerId(authUser.id, safePage, safeSize, safeQuery);
}

export async function actionGetAllOrdersFull(
  page: number,
  size?: number,
  query?: string,
) {
  const { authUser, allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) return redirect(appRoutes.dashboard);

  const {
    page: safePage,
    size: safeSize,
    query: safeQuery,
  } = PaginationSchema.parse({
    page,
    size,
    query,
  });
  return dbGetOrdersByManagerIdFull(authUser.id, safePage, safeSize, safeQuery);
}

export async function actionGetAvailableOrders(
  page: number,
  size?: number,
  query?: string,
) {
  const { allowed } = await getUserAndCheckRole(RoleEnum.DRIVER);
  if (!allowed) return redirect(appRoutes.dashboard);
  const {
    page: safePage,
    size: safeSize,
    query: safeQuery,
  } = PaginationSchema.parse({
    page,
    size,
    query,
  });

  return await dbGetAllAvailableOrders(safePage, safeSize, safeQuery);
}

export async function actionGetOrdersHistory(
  page: number,
  size?: number,
  query?: string,
) {
  const { authUser, allowed } = await getUserAndCheckRole(RoleEnum.DRIVER);
  if (!allowed) return redirect(appRoutes.dashboard);
  const {
    page: safePage,
    size: safeSize,
    query: safeQuery,
  } = PaginationSchema.parse({
    page,
    size,
    query,
  });

  return await dbGetAllHistoryOrders(
    authUser.id,
    safePage,
    safeSize,
    safeQuery,
  );
}
