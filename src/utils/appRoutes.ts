import { EntityPath, OrderPath } from "@/types/utils";

export const appRoutes: {
  root: string;
  signIn: string;
  signUp: string;
  dashboard: string;
  client: EntityPath;
  order: OrderPath;
  warehouse: EntityPath;
} = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  client: {
    root: "/dashboard/client",
    create: "/dashboard/client/create",
    view: (id: string) => `/dashboard/client/${id}`,
    edit: (id: string) => `/dashboard/client/${id}/edit`,
  },
  order: {
    root: "/dashboard/order/",
    activeOrder: "/dashboard/order/active-order",
    availableOrders: "/dashboard/order/available-orders",
    myOrders: "/dashboard/order/my-orders",
    orderHistory: "/dashboard/order/history",
    create: "/dashboard/order/create",
    view: (id: string) => `/dashboard/order/${id}`,
    edit: (id: string) => `/dashboard/order/${id}/edit`,
  },
  warehouse: {
    root: "/dashboard/warehouse",
    create: "/dashboard/warehouse/create",
    view: (id: string) => `/dashboard/warehouse/${id}`,
    edit: (id: string) => `/dashboard/warehouse/${id}/edit`,
  },
};

export const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  client: "Clients",
  create: "Create",
  edit: "Edit",
  warehouse: "Warehouses",
  order: "Orders",
  "active-order": "Active Orders",
  "available-orders": "Available Orders",
  "my-orders": "My Orders",
  history: "Order History",
  view: "Details",
  "sign-in": "Sign In",
  "sign-up": "Sign Up",
};
