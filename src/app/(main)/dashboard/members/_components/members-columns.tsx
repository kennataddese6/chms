"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Member } from "@/data/types";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { getInitials } from "@/lib/utils";

export const memberColumns: ColumnDef<DataTableFeatures, Member>[] = [
  {
    accessorKey: "name",
    header: "Member Name",
    cell: ({ row }: { row: { original: Member } }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-xs leading-tight">{member.name}</span>
            <span className="text-[11px] text-muted-foreground">{member.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }: { row: { original: Member } }) => <span className="text-xs">{row.original.phone}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: Member } }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === "active" ? "default" : status === "new" ? "secondary" : "outline"}
          className="text-[10px] capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "groups",
    header: "Ministry / Group",
    cell: ({ row }: { row: { original: Member } }) => {
      const groups = row.original.groups;
      return (
        <div className="flex flex-wrap gap-1">
          {groups.slice(0, 2).map((grp: string) => (
            <Badge key={grp} variant="outline" className="bg-muted/30 text-[10px]">
              {grp}
            </Badge>
          ))}
          {groups.length > 2 && <span className="text-[10px] text-muted-foreground">+{groups.length - 2}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "attendanceRate",
    header: "Attendance Rate",
    cell: ({ row }: { row: { original: Member } }) => {
      const rate = row.original.attendanceRate;
      const color =
        rate >= 80 ? "text-emerald-600 dark:text-emerald-400" : rate >= 60 ? "text-amber-600" : "text-red-600";
      return <span className={`font-semibold text-xs ${color}`}>{rate}%</span>;
    },
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
    cell: ({ row }: { row: { original: Member } }) => (
      <span className="text-muted-foreground text-xs">{row.original.joinedDate}</span>
    ),
  },
];
