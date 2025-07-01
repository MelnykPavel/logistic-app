import { emailSchema, passwordSchema } from "@/server/validation-schemas/common.schema";
import { z } from "zod";

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
