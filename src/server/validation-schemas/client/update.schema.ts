import { z } from "zod";

import {
  addressSchema,
  citySchema,
  countrySchema,
  cuidSchema,
  emailSchema,
  nameSchema,
  phoneNumberSchema,
  stateSchema,
  textSchema,
  zipCodeSchema,
} from "../common.schema";

export const updateClientSchema = z
  .object({
    id: cuidSchema,
    firstName: nameSchema.optional(),
    lastName: nameSchema.optional(),
    phone: phoneNumberSchema.optional(),
    email: emailSchema.optional(),
    address: addressSchema.optional(),
    city: citySchema.optional(),
    state: stateSchema.nullable().optional(),
    zipCode: zipCodeSchema.optional(),
    country: countrySchema.optional(),
    comment: textSchema.nullable().optional(),
  })
  .refine(
    (data) =>
      Object.entries(data).some(
        ([key, value]) => key !== "id" && value !== undefined,
      ),
    {
      message: "At least one field must be provided to update the client",
      path: ["form"],
    },
  );
