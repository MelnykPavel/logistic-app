"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import sidebarData from "@/constants/sidebar-data";
import { useAuth } from "@/providers/AuthContext";
import { filterNavItemsByRole } from "@/utils/navigation";
import { ComponentProps } from "react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { authUser } = useAuth();
  const filterMainItems =
    filterNavItemsByRole(sidebarData.navMain, authUser.role) ?? [];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filterMainItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
