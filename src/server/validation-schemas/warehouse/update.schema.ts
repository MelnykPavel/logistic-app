import { z } from "zod";

import {
  addressSchema,
  citySchema,
  countrySchema,
  cuidSchema,
  nameSchema,
  stateSchema,
  zipCodeSchema,
} from "../common.schema";

export const updateWarehouseSchema = z
  .object({
    id: cuidSchema,
    name: nameSchema.optional(),
    address: addressSchema.optional(),
    city: citySchema.optional(),
    state: stateSchema.nullable().optional(),
    zipCode: zipCodeSchema.optional(),
    country: countrySchema.optional(),
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

// export type UpdateWarehouseData = z.infer<typeof updateWarehouseSchema>;
