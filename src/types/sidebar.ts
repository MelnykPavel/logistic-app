import { RoleType } from "@/types/roles";
import type { LucideIcon } from "lucide-react";

export type NavTeamItem = {
  name: string;
  logo: LucideIcon;
  plan: string;
};

export type NavSubItem = {
  title: string;
  url: string;
  roles: RoleType[];
};

export type NavMainItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive: boolean;
  roles: RoleType[];
  items?: NavSubItem[];
};

export type SidebarDataType = {
  navTeams: NavTeamItem[];
  navMain: NavMainItem[];
};
