import { AuthPayload } from "@/types/auth";
import { appRoutes } from "@/utils/appRoutes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signJwt, verifyJwt } from "./jwt";

const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";
const COOKIE_MAX_AGE = process.env.COOKIE_MAX_AGE || "86400";

export async function setAuthCookie(payload: AuthPayload) {
  const token = await signJwt(payload);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: appRoutes.root,
    maxAge: Number(COOKIE_MAX_AGE),
  });
}

export async function clearAuthCookie() {
  (await cookies()).set(COOKIE_NAME, "", { maxAge: 0, path: appRoutes.root });
}

type ContextType = "server" | "middleware";

export async function getUserFromCookie(
  context?: "server",
): Promise<AuthPayload>;
export async function getUserFromCookie(
  context: "middleware",
): Promise<AuthPayload | null>;

export async function getUserFromCookie(context: ContextType = "server") {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const authUser = token ? await verifyJwt(token) : null;

  const shouldRedirect = context === "server";

  if (!authUser) {
    await clearAuthCookie();
    if (shouldRedirect) redirect(appRoutes.signIn);
    return null;
  }

  return authUser.payload;
}

export async function getUserAndCheckRole(
  ...allowedRoles: AuthPayload["role"][]
) {
  const authUser = await getUserFromCookie();
  return {
    allowed: allowedRoles.includes(authUser.role),
    authUser,
  };
}




