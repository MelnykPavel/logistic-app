"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { formAction } from "@/lib/zod-helpers";
import { dbUpdateClientById } from "@/server/db/db-client";
import { updateClientSchema } from "@/server/validation-schemas/client";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const actionUpdateClient = formAction(
  updateClientSchema,
  async (data) => {
    const { allowed } = await getUserAndCheckRole(RoleEnum.MANAGER);
    if (!allowed) {
      return {
        errors: {
          form: ["You do not have permission to perform this action."],
        },
        values: { ...data },
      };
    }

    const { id, ...rest } = data;

    await dbUpdateClientById(id, rest);

    revalidatePath(appRoutes.client.root);
    redirect(appRoutes.client.root);
  },
);
