import { z } from "zod";

import {
  cuidSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  roleEnumSchema,
} from "../common.schema";

export const updateUserSchema = z
  .object({
    id: cuidSchema,
    firstName: nameSchema.optional(),
    lastName: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    role: roleEnumSchema.optional(),
  })
  .refine(
    (data) =>
      Object.entries(data).some(
        ([key, value]) => key !== "id" && value !== undefined,
      ),
    {
      message: "At least one field must be provided to update the user",
      path: ["form"],
    },
  );
