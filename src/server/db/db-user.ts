"use server";
import { Prisma } from ".prisma/client";
import prisma from "@/lib/prisma";

type UserCreateBody = Prisma.Args<typeof prisma.user, "create">["data"];

export async function createUser(data: UserCreateBody) {
  return prisma.user.create({ data });
}

export async function getUserByEmailWithPassword(email: string) {
  return prisma.user.findUnique({
    where: { email },
    omit: { passwordHash: false },
  });
}
