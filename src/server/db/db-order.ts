"use server";
import prisma, { Prisma } from "@/lib/prisma";

import {
  OrderCreateBody,
  OrderReadBody,
  OrderReadBodyFull,
  OrderStatusEnum,
  OrderUpdateBody,
} from "@/types/order";
import OrderWhereInput = Prisma.OrderWhereInput;

export async function dbCreateOrder(data: OrderCreateBody) {
  return prisma.order.create({ data });
}

export async function dbGetOrderByIds(orderId: string, managerId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      managerId,
    },
  });
}
export async function dbGetOrderById(orderId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });
}
export async function dbGetOrderByIdFull(orderId: string, managerId?: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      ...(managerId ? { managerId } : {}),
    },
    include: {
      client: true,
      warehouse: true,
      driver: true,
      manager: true,
    },
  });
}

export async function dbGetActiveOrderByDriverId(driverId: string) {
  return prisma.order.findFirst({
    where: {
      driverId,
      status: { in: [OrderStatusEnum.ASSIGNED, OrderStatusEnum.IN_PROGRESS] },
    },
    include: {
      client: true,
      warehouse: true,
      driver: true,
      manager: true,
    },
  });
}

export async function dbGetOrdersByManagerId(
  managerId: string,
  page: number,
  size: number,
  query?: string,
) {
  const where: OrderWhereInput = query
    ? {
        managerId,
        description: {
          contains: query,
          mode: "insensitive",
        },
      }
    : { managerId };

  const [data, totalCount]: [OrderReadBody[], number] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ id: "asc" }],
    }),
    prisma.order.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}

export async function dbGetOrdersByManagerIdFull(
  managerId: string,
  page: number,
  size: number,
  query?: string,
) {
  const where: OrderWhereInput = query
    ? {
        managerId,
        description: {
          contains: query,
          mode: "insensitive",
        },
      }
    : { managerId };
  const [data, totalCount]: [OrderReadBodyFull[], number] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ id: "asc" }],
      include: {
        client: true,
        warehouse: true,
        driver: true,
        manager: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}

export async function dbGetAllAvailableOrders(
  page: number,
  size: number,
  query?: string,
) {
  const where: OrderWhereInput = query
    ? {
        description: {
          contains: query,
          mode: "insensitive",
        },
        status: OrderStatusEnum.NEW,
      }
    : { status: OrderStatusEnum.NEW };

  const [data, totalCount]: [OrderReadBodyFull[], number] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ id: "asc" }],
      include: {
        client: true,
        warehouse: true,
        driver: true,
        manager: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}

export async function dbGetAllHistoryOrders(
  driverId: string,
  page: number,
  size: number,
  query?: string,
) {
  const where: OrderWhereInput = query
    ? {
        description: {
          contains: query,
          mode: "insensitive",
        },
        driverId: driverId,
        status: {
          not: OrderStatusEnum.NEW,
        },
      }
    : {
        driverId: driverId,
        status: {
          not: OrderStatusEnum.NEW,
        },
      };

  const [data, totalCount]: [OrderReadBodyFull[], number] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ id: "asc" }],
      include: {
        client: true,
        warehouse: true,
        driver: true,
        manager: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}

export async function dbUpdateOrderById(
  orderId: string,
  data: OrderUpdateBody,
) {
  return prisma.order.update({
    where: { id: orderId },
    data,
  });
}

export async function dbDeleteOrderById(orderId: string) {
  return prisma.order.delete({ where: { id: orderId } });
}
