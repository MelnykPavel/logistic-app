import { z } from "zod";

import {
  emailSchema,
  nameSchema,
  passwordSchema,
  roleEnumSchema,
} from "../common.schema";

export const createUserSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleEnumSchema,
});
export type CreateUserData = z.infer<typeof createUserSchema>;
