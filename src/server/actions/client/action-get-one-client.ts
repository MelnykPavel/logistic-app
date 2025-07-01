"use server";

import { getUserFromCookie } from "@/lib/auth/cookies";
import { dbGetClientById, dbGetClientByManagerId } from "@/server/db/db-client";

export default async function actionGetClientById(clientId: string) {
  const authUser = await getUserFromCookie();
  if (authUser.role === "MANAGER") {
    return dbGetClientByManagerId(clientId, authUser.id);
  }
  return dbGetClientById(clientId);
}
