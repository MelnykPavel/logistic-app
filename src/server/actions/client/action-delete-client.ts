"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { dbDeleteClientById } from "@/server/db/db-client";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function actionDeleteClientById(clientId: string) {
  const { allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
  if (!allowed) {
    return {
      errors: {
        form: ["You do not have permission to perform this action."],
      },
    };
  }
  await dbDeleteClientById(clientId);

  revalidatePath(appRoutes.client.root);
  redirect(appRoutes.client.root);
}
