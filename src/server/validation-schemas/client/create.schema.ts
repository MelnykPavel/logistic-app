import { z } from "zod";

import {
  addressSchema,
  citySchema,
  countrySchema,
  emailSchema,
  nameSchema,
  phoneNumberSchema,
  stateSchema,
  textSchema,
  zipCodeSchema,
} from "../common.schema";

export const createClientSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  phone: phoneNumberSchema,
  email: emailSchema,
  address: addressSchema,
  city: citySchema,
  state: stateSchema.nullable().optional(),
  zipCode: zipCodeSchema,
  country: countrySchema,
  comment: textSchema.nullable().optional(),
});
export type CreateClientData = z.infer<typeof createClientSchema>;
