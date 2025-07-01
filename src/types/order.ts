import prisma from "@/lib/prisma";
import type { Order } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type OrderCreateBody = Prisma.Args<
  typeof prisma.order,
  "create"
>["data"];
export type OrderReadBody = Order;
export type OrderUpdateBody = Prisma.Args<
  typeof prisma.order,
  "update"
>["data"];

import { OrderStatus } from "@prisma/client";

export type OrderStatusType = OrderStatus;
export const OrderStatusEnum = OrderStatus;

export const orderSelectFull = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    client: true,
    warehouse: true,
    driver: {
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    },
    manager: {
      select: {
        id: true,
        lastName: true,
        firstName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    },
  },
});

export type OrderReadBodyFull = Prisma.OrderGetPayload<typeof orderSelectFull>;
