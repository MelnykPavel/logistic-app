import { z } from "zod";

import {
  addressSchema,
  citySchema,
  countrySchema,
  nameSchema,
  stateSchema,
  zipCodeSchema,
} from "../common.schema";

export const createWarehouseSchema = z.object({
  name: nameSchema,
  address: addressSchema,
  city: citySchema,
  state: stateSchema.nullable().optional(),
  zipCode: zipCodeSchema,
  country: countrySchema,
});

// export type CreateWarehouseData = z.infer<typeof createWarehouseSchema>;
