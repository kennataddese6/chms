"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, Calendar, Edit, MapPin, MoreHorizontal, Trash2 } from "lucide-react";

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

export function GroupCard({ group }: GroupCardProps) {
  const { deleteGroup } = useGroupsStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const categoryColorMap: Record<string, string> = {
    Ministry: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200",
    Fellowship: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200",
    Worship: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200",
    Discipleship: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200",
    Service: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200",
  };

  return (
    <>
      <Card className="flex flex-col justify-between shadow-xs transition-colors hover:border-primary/40">
        <CardHeader className="p-5 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`font-semibold text-xs ${categoryColorMap[group.category] || ""}`}>
                  {group.category}
                </Badge>
                <Badge variant="secondary" className="text-[10px] capitalize">
                  {group.status}
                </Badge>
              </div>
              <h3 className="font-bold text-base leading-snug">{group.name}</h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
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

        <CardContent className="space-y-4 p-5 pt-0 text-xs">
          <p className="line-clamp-2 text-[11px] text-muted-foreground">{group.description}</p>

          {/* Assigned Leader Row */}
          <div className="flex items-center gap-3 rounded-lg border bg-accent/20 p-2.5">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 font-medium text-primary text-xs">
                {getInitials(group.leaderName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-[10px] text-muted-foreground">Group Leader</span>
              <span className="truncate font-semibold">{group.leaderName}</span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 rounded-lg border bg-card p-2.5 text-center">
            <div>
              <div className="font-bold text-foreground text-sm">{group.memberCount}</div>
              <div className="text-[10px] text-muted-foreground">Members</div>
            </div>
            <div className="border-l">
              <div className="font-bold text-emerald-600 text-sm dark:text-emerald-400">{group.attendanceRate}%</div>
              <div className="text-[10px] text-muted-foreground">Attendance</div>
            </div>
          </div>

          {/* Attendance Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Group Attendance Rate</span>
              <span className="font-medium">{group.attendanceRate}%</span>
            </div>
            <Progress value={group.attendanceRate} className="h-1.5" />
          </div>

          {/* Schedule & Location Details */}
          <div className="space-y-1 pt-1 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0" />
              <span className="truncate">{group.meetingSchedule}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{group.location}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button variant="outline" size="sm" asChild className="w-full gap-2 text-xs">
            <Link href={`/dashboard/groups/${group.id}`}>
              View Group Details <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <CreateGroupDialog editingGroup={group} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </>
  );
}
