import prisma from "@/lib/prisma";
import type { Client } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type ClientCreateBody = Prisma.Args<
  typeof prisma.client,
  "create"
>["data"];
export type ClientReadBody = Client;
export type ClientUpdateBody = Prisma.Args<
  typeof prisma.client,
  "update"
>["data"];
