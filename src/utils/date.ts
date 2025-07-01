import dayjs from "dayjs";

export function date(inputDate: string | Date, time: boolean): string {
  if (time) return dayjs(inputDate).format("DD.MM.YYYY HH:mm");
  return dayjs(inputDate).format("DD.MM.YYYY");
}

export function parseDateValue(
  value: string | Date | undefined,
): Date | undefined {
  if (typeof value === "string") {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.toDate() : undefined;
  }

  return value instanceof Date ? value : undefined;
}
