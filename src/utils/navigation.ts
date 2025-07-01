import { RoleType } from "@/types/roles";
import { NavMainItem } from "@/types/sidebar";

export function filterNavItemsByRole(
  items: NavMainItem[],
  role: RoleType,
): NavMainItem[] {
  return items
    .filter(
      (item) =>
        item.roles.includes(role) ||
        item.items?.some((subItem) => subItem.roles.includes(role)),
    )
    .map((item) => ({
      ...item,
      items: item.items?.filter((subItem) => subItem.roles.includes(role)),
    }));
}
