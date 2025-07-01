import { OrderStatusEnum } from "@/types/order";
import { RoleEnum } from "@/types/roles";
import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod";

export const cuidSchema = z
  .string({ required_error: "Field is required." })
  .trim()
  .nonempty({ message: "CUID is required" })
  .cuid("Invalid CUID");

export const nameSchema = z
  .string()
  .trim()
  .nonempty({ message: "Field is required" })
  .min(2, "Must be at least 2 characters")
  .max(50, "Must be at most 50 characters");

export const emailSchema = z
  .string()
  .trim()
  .nonempty({ message: "Email is required" })
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .trim()
  .nonempty({ message: "Password is required" })
  .min(6, "Password must be at least 6 characters");

const roleEnumOnly = z.enum([RoleEnum.DRIVER, RoleEnum.MANAGER], {
  message: "Please choose a valid role from the list",
});

export const roleEnumSchema = z
  .string()
  .trim()
  .nonempty({ message: "Role is required" })
  .pipe(roleEnumOnly);

const orderEnumOnly = z.enum(
  [
    OrderStatusEnum.NEW,
    OrderStatusEnum.IN_PROGRESS,
    OrderStatusEnum.ASSIGNED,
    OrderStatusEnum.COMPLETED,
  ],
  {
    message: "Please choose a valid status from the list",
  },
);

export const orderEnumSchema = z
  .string()
  .trim()
  .nonempty({ message: "Status is required" })
  .pipe(orderEnumOnly);

export const phoneNumberSchema = z
  .string()
  .trim()
  .nonempty({ message: "Mobile number is required" })
  .refine(
    (number) => {
      const phoneNumber = parsePhoneNumberFromString(number);
      return phoneNumber?.isValid() ?? false;
    },
    { message: "Invalid mobile number" },
  );

export const addressSchema = z
  .string()
  .trim()
  .nonempty({ message: "Address is required" })
  .max(100, { message: "Address must be at most 100 characters" });

export const citySchema = z
  .string()
  .trim()
  .nonempty({ message: "City is required" })
  .max(50, { message: "City must be at most 50 characters" });

export const stateSchema = z
  .string()
  .trim()
  .nonempty({ message: "State is required" })
  .max(50, { message: "State must be at most 50 characters" });

export const zipCodeSchema = z
  .string()
  .trim()
  .nonempty({ message: "Zip code is required" })
  .regex(/^[0-9A-Za-z\- ]{3,10}$/, { message: "Invalid zip code format" });

export const countrySchema = z
  .string()
  .trim()
  .nonempty({ message: "Country is required" })
  .max(56, { message: "Country name must be at most 56 characters" });

export const textSchema = z
  .string()
  .trim()
  .nonempty({ message: "Field is required" })
  .max(500, { message: "Field must be at most 500 characters" });

export const dateSchema = z.union(
  [
    z
      .string()
      .trim()
      .nonempty({ message: "Field is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date string",
      }),
    z.date({ message: "Invalid date string" }),
  ],
  { required_error: "A date is required." },
);

export const PaginationSchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    size: z.coerce.number().int().min(1).optional().default(10),
    query: z.string().trim().max(100, "Query too long").optional().default(""),
  })
  .strict();
