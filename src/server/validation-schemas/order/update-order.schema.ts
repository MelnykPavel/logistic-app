import { z } from "zod";

import {
  cuidSchema,
  dateSchema,
  orderEnumSchema,
  textSchema,
} from "../common.schema";

export const updateOrderSchema = z
  .object({
    id: cuidSchema,
    warehouseId: cuidSchema,
    clientId: cuidSchema,
    driverId: cuidSchema.nullable().optional().optional(),
    status: orderEnumSchema.optional(),
    pickupDate: dateSchema,
    deliveryDate: dateSchema,
    description: textSchema.nullable().optional(),
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

export const switchOrderStatusSchema = z.object({
  orderId: cuidSchema,
  status: orderEnumSchema,
});
