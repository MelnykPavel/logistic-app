"use server";
import { Prisma } from ".prisma/client";
import prisma from "@/lib/prisma";

type UserCreateBody = Prisma.Args<typeof prisma.user, "create">["data"];
type UserUpdateBody = Prisma.Args<typeof prisma.user, "update">["data"];

export async function createUser(data: UserCreateBody) {
  return prisma.user.create({ data });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserByEmailWithPassword(email: string) {
  return prisma.user.findUnique({
    where: { email },
    omit: { passwordHash: false },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function updateUserById(id: string, data: UserUpdateBody) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
