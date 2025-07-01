"use client";

import { AuthPayload } from "@/types/auth";
import { RoleEnum } from "@/types/roles";
import { appRoutes } from "@/utils/appRoutes";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  user: AuthPayload | null;
  children: ReactNode;
};

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace(appRoutes.root);
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const value = {
    authUser: user,
    isDriver: Boolean(user?.role === RoleEnum.DRIVER),
    isManager: Boolean(user?.role === RoleEnum.MANAGER),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
