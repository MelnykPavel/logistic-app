import prisma from "@/lib/prisma";
import type { Warehouse } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type WarehouseCreateBody = Prisma.Args<
  typeof prisma.warehouse,
  "create"
>["data"];
export type WarehouseReadBody = Warehouse;
export type WarehouseUpdateBody = Prisma.Args<
  typeof prisma.warehouse,
  "update"
>["data"];
