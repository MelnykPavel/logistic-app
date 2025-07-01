"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { dbGetAllClientsByManagerId } from "@/server/db/db-client";
import { PaginationSchema } from "@/server/validation-schemas/common.schema";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export async function actionGetAllClients(
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

  return dbGetAllClientsByManagerId(authUser.id, safePage, safeSize, safeQuery);
}
