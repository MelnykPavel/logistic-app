"use server";
import { getUserAndCheckRole } from "@/lib/auth/cookies";
import { formAction } from "@/lib/zod-helpers";
import { appRoutes } from "@/utils/appRoutes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { dbUpdateWarehouseById } from "@/server/db/db-warehouse";
import { updateWarehouseSchema } from "@/server/validation-schemas/warehouse";
import { RoleEnum } from "@/types/roles";

export const actionUpdateWarehouse = formAction(
  updateWarehouseSchema,
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

    await dbUpdateWarehouseById(id, rest);

    revalidatePath(appRoutes.warehouse.root);
    redirect(appRoutes.warehouse.root);
  },
);
