import { RoleEnum } from "@/types/roles";
import { SidebarDataType } from "@/types/sidebar";

import { appRoutes } from "@/utils/appRoutes";
import {
  AudioWaveform,
  Command,
  Contact,
  GalleryVerticalEnd,
  LayoutDashboard,
  ListOrdered,
  Settings2,
  Warehouse,
} from "lucide-react";

const sidebarData: SidebarDataType = {
  navTeams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: appRoutes.dashboard,
      icon: LayoutDashboard,
      isActive: true,
      roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
    },
    {
      title: "Clients",
      url: appRoutes.client.root,
      icon: Contact,
      isActive: false,
      roles: [RoleEnum.MANAGER],
    },
    {
      title: "Warehouses",
      url: appRoutes.warehouse.root,
      icon: Warehouse,
      isActive: false,
      roles: [RoleEnum.MANAGER],
    },
    {
      title: "Orders",
      url: appRoutes.order.root,
      icon: ListOrdered,
      isActive: false,
      roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
      items: [
        {
          title: "My Orders",
          url: appRoutes.order.myOrders,
          roles: [RoleEnum.MANAGER],
        },
        {
          title: "Create New Order",
          url: appRoutes.order.create,
          roles: [RoleEnum.MANAGER],
        },
        {
          title: "Active Order",
          url: appRoutes.order.activeOrder,
          roles: [RoleEnum.DRIVER],
        },
        {
          title: "Available Orders",
          url: appRoutes.order.availableOrders,
          roles: [RoleEnum.DRIVER],
        },
        {
          title: "Orders History",
          url: appRoutes.order.orderHistory,
          roles: [RoleEnum.DRIVER],
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: false,
      roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
      items: [
        {
          title: "General",
          url: "#",
          roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
        },
        {
          title: "Team",
          url: "#",
          roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
        },
        {
          title: "Billing",
          url: "#",
          roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
        },
        {
          title: "Limits",
          url: "#",
          roles: [RoleEnum.MANAGER, RoleEnum.DRIVER],
        },
      ],
    },
  ],
};

export default sidebarData;
