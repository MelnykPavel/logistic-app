export type EntityPath = {
  root: string;
  create: string;
  view: (id: string) => string;
  edit: (id: string) => string;
};

export type OrderPath = EntityPath & {
  activeOrder: string;
  availableOrders: string;
  myOrders: string;
  orderHistory: string;
};

export type EntityKey = "client" | "warehouse" | "order";
