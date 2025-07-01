import { z } from "zod";

import {
  cuidSchema,
  dateSchema,
  orderEnumSchema,
  textSchema,
} from "../common.schema";

export const createOrderSchema = z.object({
  warehouseId: cuidSchema,
  clientId: cuidSchema,
  status: orderEnumSchema.optional(),
  pickupDate: dateSchema || textSchema,
  deliveryDate: dateSchema,
  description: textSchema.nullable().optional(),
});
export type CreateOrderData = z.infer<typeof createOrderSchema>;
