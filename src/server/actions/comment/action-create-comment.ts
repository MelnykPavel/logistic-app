"use server";
import { getUserFromCookie } from "@/lib/auth/cookies";
import { dbCreateComment } from "@/server/db/db-comment";

export async function actionCreateComment(orderId: string, content: string) {
  const authUser = await getUserFromCookie();

  return await dbCreateComment({ orderId, userId: authUser.id, content });
}
