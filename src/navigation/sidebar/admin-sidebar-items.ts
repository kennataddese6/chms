import {
  Calendar,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  type LucideIcon,
  School,
  Users,
  UsersRound,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const adminSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Church Management",
    items: [
      {
        id: "admin-overview",
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "admin-members",
        title: "Members",
        url: "/dashboard/members",
        icon: Users,
      },
      {
        id: "admin-attendance",
        title: "Attendance",
        url: "/dashboard/attendance",
        icon: CalendarCheck,
      },
      {
        id: "admin-events",
        title: "Events",
        url: "/dashboard/events",
        icon: Calendar,
      },
      {
        id: "admin-groups",
        title: "Groups & Ministries",
        url: "/dashboard/groups",
        icon: UsersRound,
      },
    ],
  },
  {
    id: 2,
    label: "Education",
    items: [
      {
        id: "admin-education",
        title: "Education Overview",
        url: "/dashboard/education",
        icon: GraduationCap,
      },
      {
        id: "admin-classes",
        title: "Classes & Cohorts",
        url: "/dashboard/education/classes",
        icon: School,
      },
      {
        id: "admin-students",
        title: "Students Directory",
        url: "/dashboard/education/students",
        icon: Users,
      },
    ],
  },
];
