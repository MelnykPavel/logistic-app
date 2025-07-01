import { FormAction } from "@/types/zod-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type FormMode = "create" | "edit" | "view";

export type FormVariantConfig<T> = {
  action: FormAction<T>;
  submitHandler: (router: AppRouterInstance, id: string) => void;
  readOnly: boolean;
  submitButtonType: "button" | "submit";
  nextButton: string;
  pendingText: string;
};

export type FormVariants<T> = {
  view: FormVariantConfig<T>;
  create: FormVariantConfig<T>;
  edit: FormVariantConfig<T>;
};
