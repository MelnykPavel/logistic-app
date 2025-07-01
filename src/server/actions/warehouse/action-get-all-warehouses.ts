"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { dbGetAllWarehousesByManagerId } from "@/server/db/db-warehouse";
import { PaginationSchema } from "@/server/validation-schemas/common.schema";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export async function actionGetAllWarehouses(
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

  return dbGetAllWarehousesByManagerId(
    authUser.id,
    safePage,
    safeSize,
    safeQuery,
  );
}
