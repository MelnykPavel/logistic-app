"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { formAction } from "@/lib/zod-helpers";

import { dbCreateWarehouse } from "@/server/db/db-warehouse";
import { createWarehouseSchema } from "@/server/validation-schemas/warehouse";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const actionCreateWarehouse = formAction(
  createWarehouseSchema,
  async (data) => {
    const { allowed, authUser } = await getUserAndCheckRole(RoleEnum.MANAGER);
    if (!allowed) {
      return {
        errors: {
          form: ["You do not have permission to perform this action."],
        },
        values: { ...data },
      };
    }

    await dbCreateWarehouse({ ...data, managerId: authUser.id });

    revalidatePath(appRoutes.warehouse.root);
    redirect(appRoutes.warehouse.root);
  },
);
