"use server";
import prisma, { Prisma } from "@/lib/prisma";
import { ClientCreateBody, ClientUpdateBody } from "@/types/client";
import ClientWhereInput = Prisma.ClientWhereInput;

export async function dbCreateClient(data: ClientCreateBody) {
  return prisma.client.create({ data });
}

export async function dbGetClientById(clientId: string) {
  return prisma.client.findUnique({ where: { id: clientId } });
}
export async function dbGetClientByManagerId(
  clientId: string,
  managerId: string,
) {
  return prisma.client.findUnique({ where: { id: clientId, managerId } });
}

export async function dbGetAllClientsByManagerId(
  managerId: string,
  page: number,
  size: number,
  query?: string,
) {
  const where: ClientWhereInput = query
    ? {
        managerId,
        firstName: {
          contains: query,
          mode: "insensitive",
        },
      }
    : { managerId };

  const [data, totalCount] = await Promise.all([
    prisma.client.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: [{ firstName: "asc" }],
    }),
    prisma.client.count({ where }),
  ]);

  const total = Math.ceil(totalCount / size);

  return { data, total };
}

export async function dbUpdateClientById(
  clientId: string,
  data: ClientUpdateBody,
) {
  return prisma.client.update({
    where: { id: clientId },
    data,
  });
}

export async function dbDeleteClientById(clientId: string) {
  return prisma.client.delete({ where: { id: clientId } });
}
