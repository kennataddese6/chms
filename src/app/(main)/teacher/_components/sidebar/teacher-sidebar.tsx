"use client";

import Link from "next/link";

import { Church } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { NavMain } from "@/app/(main)/dashboard/_components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { teacherSidebarItems } from "@/navigation/sidebar/teacher-sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";
import { DEMO_USERS } from "@/stores/role/role-store";

export function TeacherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.values.sidebar_variant,
      sidebarCollapsible: s.values.sidebar_collapsible,
      isSynced: s.isSynced,
    })),
  );

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link prefetch={false} href="/teacher">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Church className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">{APP_CONFIG.name}</span>
                  <span className="font-medium text-[11px] text-emerald-600 dark:text-emerald-400">Teacher Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={teacherSidebarItems} />
      </SidebarContent>
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-xs">
          <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 text-xs dark:bg-emerald-950 dark:text-emerald-300">
            JO
          </div>
          <div className="flex min-w-0 flex-1 flex-col text-xs">
            <span className="truncate font-semibold">{DEMO_USERS.teacher.name}</span>
            <span className="truncate text-muted-foreground">{DEMO_USERS.teacher.title}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
