"use client";

import { useState } from "react";

import { Calendar as CalendarIcon, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { members } from "@/data/members";
import type { AttendanceRecord, AttendanceStatus } from "@/data/types";
import { getInitials } from "@/lib/utils";

import { MemberAttendanceCalendarDialog } from "./member-attendance-calendar-dialog";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onToggleAttendance: (memberId: string, status: AttendanceStatus) => void;
}

export function AttendanceTable({ records, onToggleAttendance }: AttendanceTableProps) {
  const [search, setSearch] = useState("");
  const [selectedCalendarMemberId, setSelectedCalendarMemberId] = useState<string | null>(null);

  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <div className="relative max-w-sm">
        <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search member by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-8 text-xs"
        />
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs">Member</TableHead>
              <TableHead className="font-semibold text-xs">Group / Ministry</TableHead>
              <TableHead className="font-semibold text-xs">Overall Rate</TableHead>
              <TableHead className="font-semibold text-xs">Status Badge</TableHead>
              <TableHead className="text-right font-semibold text-xs">Calendar History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => {
              const record = records.find((r) => r.memberId === member.id);
              const isPresent = record ? record.status === "present" : true;

              return (
                <TableRow key={member.id} className="transition-colors hover:bg-muted/40">
                  <TableCell className="py-2.5 text-center">
                    <Checkbox
                      checked={isPresent}
                      onCheckedChange={(checked) => onToggleAttendance(member.id, checked ? "present" : "absent")}
                    />
                  </TableCell>
                  <TableCell className="py-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCalendarMemberId(member.id)}
                      className="flex items-center gap-2.5 text-left hover:underline"
                    >
                      <Avatar className="size-7">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-xs leading-tight">{member.name}</span>
                        <span className="text-[11px] text-muted-foreground">{member.phone}</span>
                      </div>
                    </button>
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
                  <TableCell className="py-2.5 font-semibold text-xs">{member.attendanceRate}%</TableCell>
                  <TableCell className="py-2.5">
                    <Badge variant={isPresent ? "default" : "destructive"} className="text-[10px] capitalize">
                      {isPresent ? "Present" : "Absent"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCalendarMemberId(member.id)}
                      className="h-7 gap-1 px-2 text-[11px]"
                    >
                      <CalendarIcon className="size-3 text-primary" /> View Calendar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <MemberAttendanceCalendarDialog
        memberId={selectedCalendarMemberId}
        open={!!selectedCalendarMemberId}
        onOpenChange={(open) => {
          if (!open) setSelectedCalendarMemberId(null);
        }}
      />
    </div>
  );
}
