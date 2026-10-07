"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ChurchGroup } from "@/data/types";
import { getInitials } from "@/lib/utils";
import { useGroupsStore } from "@/stores/groups/groups-store";

import { CreateGroupDialog } from "./create-group-dialog";

interface GroupTableProps {
  groups: ChurchGroup[];
}

export function GroupTable({ groups }: GroupTableProps) {
  const { deleteGroup } = useGroupsStore();
  const [editingGroup, setEditingGroup] = useState<ChurchGroup | null>(null);

  const categoryColorMap: Record<string, string> = {
    Ministry: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200",
    Fellowship: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200",
    Worship: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200",
    Discipleship: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200",
    Service: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200",
  };

  return (
    <div className="overflow-x-auto rounded-md border bg-card shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Leader</TableHead>
            <TableHead className="text-center">Members</TableHead>
            <TableHead>Meeting Schedule</TableHead>
            <TableHead className="w-36">Attendance Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="py-8 text-center text-muted-foreground text-sm">
                No groups or ministries found. Click &quot;Create Group / Ministry&quot; to add one.
              </TableCell>
            </TableRow>
          ) : (
            groups.map((grp) => (
              <TableRow key={grp.id} className="text-xs">
                <TableCell className="font-semibold text-foreground">
                  <Link href={`/dashboard/groups/${grp.id}`} className="flex items-center gap-1.5 hover:underline">
                    {grp.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${categoryColorMap[grp.category] || ""}`}>
                    {grp.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                        {getInitials(grp.leaderName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{grp.leaderName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold">{grp.memberCount}</TableCell>
                <TableCell className="text-muted-foreground">{grp.meetingSchedule}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>{grp.attendanceRate}%</span>
                    </div>
                    <Progress value={grp.attendanceRate} className="h-1.5" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {grp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs">
                      <Link href={`/dashboard/groups/${grp.id}`}>
                        View <ArrowRight className="size-3" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 text-xs">
                        <DropdownMenuItem onClick={() => setEditingGroup(grp)}>
                          <Edit className="mr-2 size-3.5" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteGroup(grp.id)}>
                          <Trash2 className="mr-2 size-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingGroup && (
        <CreateGroupDialog
          editingGroup={editingGroup}
          open={!!editingGroup}
          onOpenChange={(open) => {
            if (!open) setEditingGroup(null);
          }}
        />
      )}
    </div>
  );
}
