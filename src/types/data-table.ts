import { ReactNode } from "react";

export type TableColumns<T> = {
  key: keyof Omit<T, "id" | "managerId"> | "actions";
  title: string;
  className?: string;
  render?: (value: T[keyof T] | null, item: T) => ReactNode;
};
