"use client";

import { useState } from "react";

import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members } from "@/data/members";
import type { AttendanceRecord, AttendanceStatus } from "@/data/types";
import { getInitials } from "@/lib/utils";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onToggleAttendance: (memberId: string, status: AttendanceStatus) => void;
}

export function AttendanceTable({ records, onToggleAttendance }: AttendanceTableProps) {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search member by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 text-xs h-9"
        />
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-xs font-semibold text-center">Status</TableHead>
              <TableHead className="text-xs font-semibold">Member</TableHead>
              <TableHead className="text-xs font-semibold">Group / Ministry</TableHead>
              <TableHead className="text-xs font-semibold">Overall Rate</TableHead>
              <TableHead className="text-xs font-semibold">Status Badge</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => {
              const record = records.find((r) => r.memberId === member.id);
              const isPresent = record ? record.status === "present" : true;

              return (
                <TableRow key={member.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="text-center py-2.5">
                    <Checkbox
                      checked={isPresent}
                      onCheckedChange={(checked) => onToggleAttendance(member.id, checked ? "present" : "absent")}
                    />
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-7">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs leading-tight">{member.name}</span>
                        <span className="text-[11px] text-muted-foreground">{member.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {member.groups.slice(0, 2).map((g) => (
                        <Badge key={g} variant="outline" className="text-[10px]">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5 text-xs font-semibold">{member.attendanceRate}%</TableCell>
                  <TableCell className="py-2.5">
                    <Badge variant={isPresent ? "default" : "destructive"} className="text-[10px] capitalize">
                      {isPresent ? "Present" : "Absent"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
