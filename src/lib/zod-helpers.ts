import { FormAction, FormActionState } from "@/types/zod-types";
import { ZodError, ZodTypeAny, z } from "zod";

const safeParse = <Schema extends ZodTypeAny>(
  schema: Schema,
  params: FormData,
):
  | { success: true; error: null; data: z.infer<Schema> }
  | {
      success: false;
      error: ReturnType<ZodError["flatten"]>;
      rawError: ZodError;
      data: null;
    } => {
  const args = Object.fromEntries(
    params
      .entries()
      .map(([key, value]) => [key, value === "" ? undefined : value]),
  );

  const payload = schema.safeParse(args);

  if (!payload.success) {
    const rawError = payload.error;
    const error = rawError.flatten();
    return { success: false, error, rawError, data: null };
  }

  return { success: true, error: null, data: payload.data };
};

export function formAction<Schema extends ZodTypeAny>(
  schema: Schema,
  handler: (
    data: z.infer<Schema>,
  ) => Promise<FormActionState<z.infer<Schema>> | void>,
): FormAction<z.infer<Schema>> {
  return async (prevState, formData) => {
    const result = safeParse(schema, formData);

    if (!result.success) {
      return {
        errors: result.error.fieldErrors as Partial<
          Record<keyof z.infer<Schema>, string[]>
        >,
        values: Object.fromEntries(formData.entries()) as Partial<
          z.infer<Schema>
        >,
      };
    }

    const handlerResult = await handler(result.data);

    if (handlerResult) {
      return handlerResult;
    }

    return {
      errors: {},
      values: {},
    };
  };
}
