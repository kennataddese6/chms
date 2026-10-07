"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, Calendar, Edit, MapPin, MoreHorizontal, Trash2, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import type { ChurchGroup } from "@/data/types";
import { getInitials } from "@/lib/utils";
import { useGroupsStore } from "@/stores/groups/groups-store";

import { CreateGroupDialog } from "./create-group-dialog";

interface GroupCardProps {
  group: ChurchGroup;
}

function getCategoryTheme(category: string) {
  switch (category) {
    case "Worship":
      return {
        badge: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        accentBg: "bg-amber-500",
        borderHover: "hover:border-amber-500/40",
      };
    case "Fellowship":
      return {
        badge: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
        accentBg: "bg-blue-500",
        borderHover: "hover:border-blue-500/40",
      };
    case "Discipleship":
      return {
        badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        accentBg: "bg-emerald-500",
        borderHover: "hover:border-emerald-500/40",
      };
    case "Service":
      return {
        badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
        accentBg: "bg-indigo-500",
        borderHover: "hover:border-indigo-500/40",
      };
    default: // Ministry
      return {
        badge: "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300",
        accentBg: "bg-purple-500",
        borderHover: "hover:border-purple-500/40",
      };
  }
}

export function GroupCard({ group }: GroupCardProps) {
  const { deleteGroup } = useGroupsStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const theme = getCategoryTheme(group.category);

  return (
    <>
      <Card
        className={`group relative flex flex-col justify-between overflow-hidden border shadow-xs transition-all duration-200 hover:shadow-md ${theme.borderHover}`}
      >
        {/* Top Visual Accent Line */}
        <div className={`h-1 w-full ${theme.accentBg}`} />

        <CardHeader className="p-4 pb-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`font-bold text-[11px] ${theme.badge}`}>
                  {group.category}
                </Badge>
                <span
                  className="flex size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"
                  title="Active Ministry"
                />
              </div>
              <h3 className="font-bold text-base leading-snug text-foreground group-hover:text-primary transition-colors">
                {group.name}
              </h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 text-xs">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="mr-2 size-3.5" /> Edit Group
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => deleteGroup(group.id)}>
                  <Trash2 className="mr-2 size-3.5" /> Delete Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 p-4 pt-0 text-xs">
          <p className="line-clamp-2 text-[11px] text-muted-foreground leading-relaxed">{group.description}</p>

          {/* Group Leader Profile Box */}
          <div className="flex items-center gap-2.5 rounded-lg border bg-muted/30 p-2">
            <Avatar className="size-7 border bg-background">
              <AvatarFallback className="bg-primary/10 font-bold text-[10px] text-primary">
                {getInitials(group.leaderName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                Group Leader
              </span>
              <span className="truncate font-semibold text-xs text-foreground">{group.leaderName}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 rounded-lg border bg-card p-2.5 text-center">
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 font-bold text-foreground text-sm">
                <Users className="size-3.5 text-muted-foreground" />
                {group.memberCount}
              </div>
              <div className="text-[10px] text-muted-foreground">Enrolled Members</div>
            </div>

            <div className="space-y-0.5 border-l">
              <div className="font-bold text-emerald-600 text-sm dark:text-emerald-400">{group.attendanceRate}%</div>
              <div className="text-[10px] text-muted-foreground">Attendance Rate</div>
            </div>
          </div>

          {/* Attendance Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Participation Metric</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{group.attendanceRate}%</span>
            </div>
            <Progress value={group.attendanceRate} className="h-1.5" />
          </div>

          {/* Schedule & Location Pills */}
          <div className="space-y-1 text-[11px] text-muted-foreground">
            {group.meetingSchedule && (
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="size-3.5 shrink-0 text-primary/70" />
                <span className="truncate">{group.meetingSchedule}</span>
              </div>
            )}
            {group.location && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="size-3.5 shrink-0 text-primary/70" />
                <span className="truncate">{group.location}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full justify-between font-medium text-xs shadow-2xs hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Link href={`/dashboard/groups/${group.id}`}>
              <span>View Group Details</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <CreateGroupDialog editingGroup={group} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </>
  );
}
