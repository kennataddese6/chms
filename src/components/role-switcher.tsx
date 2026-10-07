"use client";

import { useRouter } from "next/navigation";

import { Check, ChevronDown, GraduationCap, School, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserRole } from "@/data/types";
import { DEMO_USERS, useRoleStore } from "@/stores/role/role-store";

const ROLE_CONFIG: Record<
  UserRole,
  { label: string; route: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  admin: {
    label: "Admin View",
    route: "/dashboard",
    icon: Shield,
    color: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  teacher: {
    label: "Teacher Portal",
    route: "/teacher",
    icon: School,
    color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  student: {
    label: "Student Portal",
    route: "/student",
    icon: GraduationCap,
    color: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  },
};

export function RoleSwitcher() {
  const router = useRouter();
  const { currentRole, user, setRole } = useRoleStore();

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    const config = ROLE_CONFIG[role];
    if (config) {
      router.push(config.route);
    }
  };

  const CurrentIcon = ROLE_CONFIG[currentRole].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 border-primary/20 bg-background/80 px-2.5 hover:bg-accent"
        >
          <div className={`flex size-6 items-center justify-center rounded-md ${ROLE_CONFIG[currentRole].color}`}>
            <CurrentIcon className="size-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-xs leading-none">{ROLE_CONFIG[currentRole].label}</span>
            <span className="max-w-[120px] truncate text-[10px] text-muted-foreground leading-tight">{user.name}</span>
          </div>
          <ChevronDown className="ml-1 size-3.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal text-muted-foreground text-xs">
          Switch Prototype Persona
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(ROLE_CONFIG) as UserRole[]).map((roleKey) => {
          const config = ROLE_CONFIG[roleKey];
          const roleUser = DEMO_USERS[roleKey];
          const Icon = config.icon;
          const isSelected = currentRole === roleKey;

          return (
            <DropdownMenuItem
              key={roleKey}
              onClick={() => handleRoleChange(roleKey)}
              className="flex cursor-pointer items-center justify-between py-2"
            >
              <div className="flex items-center gap-2.5">
                <div className={`flex size-7 items-center justify-center rounded-md ${config.color}`}>
                  <Icon className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs">{config.label}</span>
                  <span className="text-[11px] text-muted-foreground">{roleUser.name}</span>
                </div>
              </div>
              {isSelected && <Check className="size-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
