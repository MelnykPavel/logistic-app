import { AuthPayload } from "@/types/auth";
import { createContext, useContext } from "react";

type AuthContextType = {
  authUser: AuthPayload;
  isDriver: boolean;
  isManager: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
