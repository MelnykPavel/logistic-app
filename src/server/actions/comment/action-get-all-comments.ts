"use server";
import { getUserFromCookie } from "@/lib/auth/cookies";
import { dbGetAllComments } from "@/server/db/db-comment";
import {
  cuidSchema,
  PaginationSchema,
} from "@/server/validation-schemas/common.schema";
import { appRoutes } from "@/utils/appRoutes";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import CommentWhereInput = Prisma.CommentWhereInput;

export async function actionGetAllComments(
  orderId: string,
  page: number,
  size?: number,
  query?: string,
) {
  await getUserFromCookie();

  const PaginationWithCuidSchema = PaginationSchema.extend({
    orderId: cuidSchema,
  });

  const result = PaginationWithCuidSchema.safeParse({
    orderId,
    page,
    size,
    query,
  });
  if (!result.success) return redirect(appRoutes.dashboard);

  const where: CommentWhereInput = {
    orderId: result.data.orderId,
  };
  return dbGetAllComments(where, result.data.page, result.data.size);
}
