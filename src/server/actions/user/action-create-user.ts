"use server";
import { hashPassword } from "@/lib/auth/hash";
import { formAction } from "@/lib/zod-helpers";
import { createUser } from "@/server/db/db-user";
import { createUserSchema } from "@/server/validation-schemas/user";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export const createUserAction = formAction(createUserSchema, async (data) => {
  const { password, ...rest } = data;

  const passwordHash = await hashPassword(password);

  await createUser({ ...rest, passwordHash });

  redirect(appRoutes.signIn);
});
