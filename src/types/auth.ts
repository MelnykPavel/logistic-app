import { RoleType } from "@/types/roles";

export type AuthPayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleType;
};
