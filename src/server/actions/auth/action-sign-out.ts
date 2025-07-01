"use server";
import { clearAuthCookie } from "@/lib/auth/cookies";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export default async function actionSignOut() {
  await clearAuthCookie();
  redirect(appRoutes.signIn);
}
