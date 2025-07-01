import { FormVariants } from "@/types/form";
import { FormAction } from "@/types/zod-types";

export function createFormVariants<T>({
  entityName,
  createAction,
  updateAction,
  baseRoute,
}: {
  entityName: string;
  createAction: FormAction<T>;
  updateAction: FormAction<T>;
  baseRoute: string;
}): FormVariants<T> {
  return {
    view: {
      action: async (prevState) => prevState,
      submitHandler: (router, id) => router.push(`${baseRoute}/${id}/edit`),
      readOnly: true,
      submitButtonType: "button",
      nextButton: `Edit ${entityName}`,
      pendingText: `Edit ${entityName}`,
    },
    create: {
      action: createAction,
      submitHandler: () => {},
      readOnly: false,
      submitButtonType: "submit",
      nextButton: `Create ${entityName}`,
      pendingText: `Creating...`,
    },
    edit: {
      action: updateAction,
      submitHandler: () => {},
      readOnly: false,
      submitButtonType: "submit",
      nextButton: "Save Changes",
      pendingText: "Saving...",
    },
  };
}
