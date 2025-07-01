"use server";

import { setAuthCookie } from "@/lib/auth/cookies";
import { comparePassword } from "@/lib/auth/hash";

import { formAction } from "@/lib/zod-helpers";
import { getUserByEmailWithPassword } from "@/server/db/db-user";
import { signInSchema } from "@/server/validation-schemas/auth/singIn.schema";
import { AuthPayload } from "@/types/auth";
import { redirect } from "next/navigation";

export const actionSignIn = formAction(signInSchema, async (data) => {
  const { email, password } = data;

  try {
    const user = await getUserByEmailWithPassword(email);

    if (!user) {
      return {
        errors: { form: ["Invalid Email or Password"] },
        values: { ...data },
      };
    }
    const isValid = await comparePassword(password, user.passwordHash);

    if (!isValid) {
      return {
        errors: { form: ["Invalid Email or Password"] },
        values: { ...data },
      };
    }
    const payload: AuthPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    await setAuthCookie(payload);
  } catch (error) {
    console.error(error);
    return {
      errors: { form: ["Something went wrong please try again"] },
    };
  }

  redirect("/");
});
