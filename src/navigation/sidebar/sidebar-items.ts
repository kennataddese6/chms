import type { NavGroup } from "./admin-sidebar-items";
import { adminSidebarItems } from "./admin-sidebar-items";

export type {
  NavBadge,
  NavGroup,
  NavMainItem,
  NavMainLinkItem,
  NavMainParentItem,
  NavSubItem,
} from "./admin-sidebar-items";

export const sidebarItems: NavGroup[] = adminSidebarItems;
