import { getUserFromCookie } from "@/lib/auth/cookies";
import { appRoutes } from "@/utils/appRoutes";
import { redirect } from "next/navigation";

export default async function OrderPage() {
  const { role } = await getUserFromCookie();
  if (role === "DRIVER") redirect(appRoutes.order.availableOrders);
  if (role === "MANAGER") redirect(appRoutes.order.myOrders);
  return null;
}
