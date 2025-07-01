"use server";
import prisma, { Prisma } from "@/lib/prisma";

import { WarehouseCreateBody, WarehouseUpdateBody } from "@/types/warehouse";
import WarehouseWhereInput = Prisma.WarehouseWhereInput;

export async function dbCreateWarehouse(data: WarehouseCreateBody) {
  return prisma.warehouse.create({ data });
}

export async function dbGetWarehouseByManagerId(
  warehouseId: string,
  managerId: string,
) {
  return prisma.warehouse.findUnique({ where: { id: warehouseId, managerId } });
}

export async function dbGetWarehouseById(warehouseId: string) {
  return prisma.warehouse.findUnique({ where: { id: warehouseId } });
}

export async function dbGetAllWarehousesByManagerId(
  managerId: string,
  page: number,
  size: number,
  query?: string,
) {
  const where: WarehouseWhereInput = query
    ? {
        managerId,
        name: {
          contains: query,
          mode: "insensitive",
        },
      }
    : { managerId };

  const [data, totalCount] = await Promise.all([
    prisma.warehouse.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ name: "asc" }],
    }),
    prisma.warehouse.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}

export async function dbUpdateWarehouseById(
  warehouseId: string,
  data: WarehouseUpdateBody,
) {
  return prisma.warehouse.update({
    where: { id: warehouseId },
    data,
  });
}
export async function dbDeleteWarehouseById(warehouseId: string) {
  return prisma.warehouse.delete({ where: { id: warehouseId } });
}
