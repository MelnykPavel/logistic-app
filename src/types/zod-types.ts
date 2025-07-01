export type FormActionState<Data> = {
  errors?: Partial<Record<keyof Data | "form", string[]>>;
  values?: Partial<Data>;
};

export type FormAction<Data> = (
  prevState: FormActionState<Data>,
  formData: FormData,
) => Promise<FormActionState<Data>>;
